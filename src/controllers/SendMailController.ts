import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { isUUID, validate } from 'class-validator'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { User } from '../entities/User'

export class SendMailController {
  static execute = async (request: Request, response: Response, next: NextFunction) => {
    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    const { email, survey_id } = request.body
    let user: User

    if (!isUUID(survey_id)) {
      return response.status(400).json({ message: 'Invalid input syntax for UUID.' })
    }

    try {
      user = await usersRepository.findOneOrFail({ email })
    } catch (error) {
      return response.status(400).json({ message: 'User does not exists.' })
    }

    try {
      await surveysRepository.findOneOrFail({ id: survey_id })
    } catch (error) {
      return response.status(400).json({ message: 'Survey does not exists.' })
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    })

    const errors = await validate(surveyUser)
    if (errors.length > 0) {
      return response.status(400).json(errors)
    }

    try {
      await surveysUsersRepository.save(surveyUser)
    } catch (error) {
      return response.status(500).json({ message: error })
    }

    return response.status(201).json({ message: surveyUser })
  }
}