import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { validate } from 'class-validator'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { Survey } from '../entities/Survey'

export class SurveysController {
  static listAll = async (_request: Request, response: Response, _next: NextFunction) => {
    const surveysRepository = getCustomRepository(SurveysRepository)
    let surveys: Survey[]

    try {
      surveys = await surveysRepository.find()
    } catch (error) {
      return response.status(500).json({ error: error })
    }

    if (surveys.length === 0) {
      return response.status(400).json({ error: 'Survey does not exists!' })
    }

    return response.status(200).json({ data: surveys })
  }

  static create = async (request: Request, response: Response, _next: NextFunction) => {
    const surveysRepository = getCustomRepository(SurveysRepository)
    const { title, description } = request.body

    const survey = surveysRepository.create({
      title,
      description
    })

    const errors = await validate(survey)
    if (errors.length > 0) {
      return response.status(400).json({ error: errors })
    }

    try {
      await surveysRepository.save(survey)
    } catch (error) {
      return response.status(500).json({ error: error })
    }

    return response.status(201).json({ message: 'Survey created successfully.' })
  }
}