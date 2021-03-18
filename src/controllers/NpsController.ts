import { Request, Response, NextFunction } from 'express'
import { getCustomRepository, Not, IsNull } from 'typeorm'
import { isUUID } from 'class-validator'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { SurveyUser } from '../entities/SurveyUser'

export class NpsController {
  static execute = async (request: Request, response: Response, _next: NextFunction) => {
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    const { survey_id } = request.params
    let surveysUsers: SurveyUser[]

    if (!isUUID(survey_id)) {
      return response.status(400).json({ error: 'Invalid input syntax for UUID!' })
    }

    try {
      surveysUsers = await surveysUsersRepository.find({
        survey_id,
        value: Not(IsNull())
      })
    } catch (error) {
      return response.status(400).json({ error: 'Survey User does not exists!' })
    }

    const detractors = surveysUsers.filter(
      survey => survey.value >= 0 && survey.value <= 6
    ).length

    const promoters = surveysUsers.filter(
      survey => survey.value >= 9 && survey.value <= 10
    ).length

    const passives = surveysUsers.filter(
      survey => survey.value >= 7 && survey.value <= 8
    ).length

    const totalAnswers = surveysUsers.length

    const calculate = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2))

    return response.status(200).json({
      data: {
        detractors,
        promoters,
        passives,
        totalAnswers,
        nps: calculate
      }
    })
  }
}