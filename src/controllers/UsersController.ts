import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm'
import { validate, isUUID } from 'class-validator'
import * as yup from 'yup';
import { UsersRepository } from '../repositories/UsersRepository'
import { User } from '../entities/User'

export class UsersController {
  static listAll = async (_request: Request, response: Response, _next: NextFunction) => {
    const usersRepository = getCustomRepository(UsersRepository)
    let users: User[]

    try {
      users = await usersRepository.find()
    } catch (error) {
      return response.status(500).json({ error: error })
    }

    if (users.length === 0) {
      return response.status(400).json({ error: 'User does not exists!' })
    }

    return response.status(200).json({ data: users })
  }

  static getOneById = async (request: Request, response: Response, _next: NextFunction) => {
    const usersRepository = getCustomRepository(UsersRepository)
    const id = request.params.id

    if (!isUUID(id)) {
      return response.status(400).json({ error: 'Invalid input syntax for UUID!' })
    }

    try {
      const user = await usersRepository.findOneOrFail(id)
      return response.status(200).json({ data: user })
    } catch (error) {
      return response.status(400).json({ error: 'User does not exists!' })
    }
  }

  static create = async (request: Request, response: Response, _next: NextFunction) => {
    const usersRepository = getCustomRepository(UsersRepository)
    const { name, email } = request.body
    let userAlreadyExists: User

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required()
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      return response.status(400).json({ error: error })
    }

    try {
      userAlreadyExists = await usersRepository.findOne({ email })
    } catch (error) {
      return response.status(500).json({ error: error })
    }

    if (userAlreadyExists) {
      return response.status(400).json({ error: 'Email already in use!' })
    }

    const user = usersRepository.create({
      name,
      email
    })

    const errors = await validate(user)
    if (errors.length > 0) {
      return response.status(400).json({ error: errors })
    }

    try {
      await usersRepository.save(user)
    } catch (error) {
      return response.status(500).json({ error: error })
    }

    return response.status(201).json({ message: 'User created successfully.' })
  }

  static delete = async (request: Request, response: Response, _next: NextFunction) => {
    const usersRepository = getCustomRepository(UsersRepository)
    const id = request.params.id

    if (!isUUID(id)) {
      return response.status(400).json({ error: 'Invalid input syntax for UUID!' })
    }

    try {
      await usersRepository.findOneOrFail(id)
    } catch (error) {
      return response.status(400).json({ error: 'User does not exists!' })
    }

    try {
      await usersRepository.delete(id)
    } catch (error) {
      return response.status(500).json({ error: error })
    }

    return response.status(200).json({ message: 'User successfully deleted.' })
  }
}