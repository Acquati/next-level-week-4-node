import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveyUser } from '../entities/SurveyUser'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

export class AnswerController {
  async execute(request: Request, response: Response, _next: NextFunction) {
    const { value } = request.params
    const { u } = request.query
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    let surveyUser: SurveyUser

    try {
      surveyUser = await surveysUsersRepository.findOneOrFail({
        id: String(u)
      })
    } catch (error) {
      return response.status(400).json({ error: 'Survey User does not exists.' })
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