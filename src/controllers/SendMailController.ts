import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { isUUID, validate } from 'class-validator'
import { resolve } from 'path'
import { UsersRepository } from '../repositories/UsersRepository'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { User } from '../entities/User'
import { Survey } from '../entities/Survey'
import { SurveyUser } from '../entities/SurveyUser'
// import { AppError } from '../errors/AppError'
import SendMailService from '../services/SendMailService'

export class SendMailController {
  static execute = async (request: Request, response: Response, _next: NextFunction) => {
    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    const { email, survey_id } = request.body
    let user: User
    let survey: Survey
    let surveyUserAlredyExists: SurveyUser

    if (!isUUID(survey_id)) {
      // throw new AppError('Survey does not exists A!')
      return response.status(400).json({ error: 'Invalid input syntax for UUID!' })
    }

    try {
      user = await usersRepository.findOneOrFail({ email })
    } catch (error) {
      return response.status(400).json({ error: 'User does not exists!' })
    }

    try {
      survey = await surveysRepository.findOneOrFail({ id: survey_id })
    } catch (error) {
      return response.status(400).json({ error: 'Survey does not exists!' })
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

    try {
      surveyUserAlredyExists = await surveysUsersRepository.findOne({
        // where: [{ user_id: user.id }, { value: null }], OR ||
        where: { user_id: user.id, value: null }, // AND &&
        relations: ['user', 'survey']
      })
    } catch (error) {
      return response.status(500).json({ error: error })
    }

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.URL_MAIL
    }

    if (surveyUserAlredyExists) {
      variables.id = surveyUserAlredyExists.id

      try {
        await SendMailService.execute(email, survey.title, variables, npsPath)
      } catch (error) {
        return response.status(500).json({ error: error })
      }

      return response.status(200).json({ data: surveyUserAlredyExists })
    }

    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id
    })

    const errors = await validate(surveyUser)
    if (errors.length > 0) {
      return response.status(400).json({ error: errors })
    }

    try {
      await surveysUsersRepository.save(surveyUser)
    } catch (error) {
      return response.status(500).json({ error: error })
    }

    try {
      variables.id = surveyUser.id
      await SendMailService.execute(email, survey.title, variables, npsPath)
    } catch (error) {
      return response.status(500).json({ error: error })
    }

    return response.status(200).json({ data: surveyUser })
  }
}