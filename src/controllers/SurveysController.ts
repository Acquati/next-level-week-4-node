import { NextFunction, Request, Response } from 'express'
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
      return response.status(500).json({ message: error })
    }

    if (surveys.length === 0) {
      return response.status(404).json({ message: 'No survey found.' })
    }

    return response.status(200).json(surveys)
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
      return response.status(400).json(errors)
    }

    try {
      await surveysRepository.save(survey)
    } catch (error) {
      return response.status(500).json({ message: error })
    }

    return response.status(201).json({ message: 'Survey created successfully.' })
  }
}