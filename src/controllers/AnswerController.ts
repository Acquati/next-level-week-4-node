import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { isUUID } from 'class-validator'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { SurveyUser } from '../entities/SurveyUser'

export class AnswerController {
  static execute = async (request: Request, response: Response, _next: NextFunction) => {
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    const { value } = request.params
    const { u } = request.query
    let surveyUser: SurveyUser

    if (!isUUID(u)) {
      return response.status(400).json({ error: 'Invalid input syntax for UUID!' })
    }

    try {
      surveyUser = await surveysUsersRepository.findOneOrFail({
        id: String(u)
      })
    } catch (error) {
      return response.status(400).json({ error: 'Survey User does not exists!' })
    }

    surveyUser.value = Number(value)

    try {
      await surveysUsersRepository.save(surveyUser)
    } catch (error) {
      return response.status(500).json({ error: error })
    }

    return response.status(200).json({ data: surveyUser })
  }
}