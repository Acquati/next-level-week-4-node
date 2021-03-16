import { NextFunction, Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { validate, isUUID } from 'class-validator'
import { User } from '../entities/User'
import { UsersRepository } from '../repositories/UsersRepository'

export class UsersController {
  static listAll = async (_request: Request, response: Response, _next: NextFunction) => {
    const usersRepository = getCustomRepository(UsersRepository)
    let users: User[]

    try {
      users = await usersRepository.find()
    } catch (error) {
      return response.status(500).json({ message: error })
    }

    if (users.length === 0) {
      return response.status(400).json({ message: 'User does not exists.' })
    }

    return response.status(200).json(users)
  }

  static getOneById = async (request: Request, response: Response, _next: NextFunction) => {
    const usersRepository = getCustomRepository(UsersRepository)
    const id = request.params.id

    if (!isUUID(id)) {
      return response.status(400).json({ message: 'Invalid input syntax for UUID.' })
    }

    try {
      const user = await usersRepository.findOneOrFail(id)
      return response.status(200).json(user)
    } catch (error) {
      return response.status(400).json({ message: 'User does not exists.' })
    }
  }

  static create = async (request: Request, response: Response, _next: NextFunction) => {
    const usersRepository = getCustomRepository(UsersRepository)
    const { name, email } = request.body
    let userAlreadyExists: User

    try {
      userAlreadyExists = await usersRepository.findOne({ email })
    } catch (error) {
      return response.status(500).json({ message: error })
    }

    if (userAlreadyExists) {
      return response.status(400).json({ message: 'Email already in use.' })
    }

    const user = usersRepository.create({
      name,
      email
    })

    const errors = await validate(user)
    if (errors.length > 0) {
      return response.status(400).json(errors)
    }

    try {
      await usersRepository.save(user)
    } catch (error) {
      return response.status(500).json({ message: error })
    }

    return response.status(201).json({ message: 'User created successfully.' })
  }

  static delete = async (request: Request, response: Response, _next: NextFunction) => {
    const usersRepository = getCustomRepository(UsersRepository)
    const id = request.params.id

    if (!isUUID(id)) {
      return response.status(400).json({ message: 'Invalid input syntax for UUID.' })
    }

    try {
      await usersRepository.findOneOrFail(id)
    } catch (error) {
      return response.status(400).json({ message: 'User does not exists.' })
    }

    try {
      await usersRepository.delete(id)
    } catch (error) {
      return response.status(500).json({ message: error })
    }

    return response.status(200).json({ message: 'User successfully deleted.' })
  }
}