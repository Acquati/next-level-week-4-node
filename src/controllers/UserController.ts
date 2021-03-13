import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate, isUUID } from 'class-validator'
import { User } from '../entities/User'

export class UserController {
  static listAll = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    let users: User[]

    try {
      users = await userRepository.find()
    } catch (error) {
      return response.status(500).json({ message: error })
    }

    if (users.length === 0) {
      return response.status(404).json({ message: 'No user found.' })
    }

    return response.status(200).json(users)
  }

  static getOneById = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    const id = request.params.id

    if (!isUUID(id)) {
      return response.status(400).json({ message: 'Invalid input syntax for UUID.' })
    }

    try {
      const user = await userRepository.findOneOrFail(id)
      return response.status(200).json(user)
    } catch (error) {
      return response.status(404).json({ message: 'No user found. ' + error })
    }
  }

  static create = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    const { name, email } = request.body
    let userAlreadyExists: User

    try {
      userAlreadyExists = await userRepository.findOne({ email })
    } catch (error) {
      return response.status(500).json({ message: error })
    }

    if (userAlreadyExists) {
      return response.status(400).json({ message: 'Email already in use.' })
    }

    const user = userRepository.create({
      name,
      email
    })

    const errors = await validate(user)
    if (errors.length > 0) {
      return response.status(400).json(errors)
    }

    try {
      await userRepository.save(user)
    } catch (error) {
      return response.status(500).json({ message: error })
    }

    return response.status(200).json({ message: 'User created successfully.' })
  }

  static delete = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    const id = request.params.id

    if (!isUUID(id)) {
      return response.status(400).json({ message: 'Invalid input syntax for UUID.' })
    }

    try {
      await userRepository.findOneOrFail(id)
    } catch (error) {
      return response.status(404).json({ message: 'No user found. ' + error })
    }

    try {
      await userRepository.delete(id)
    } catch (error) {
      return response.status(500).json({ message: error })
    }

    return response.status(200).json({ message: 'User successfully deleted.' })
  }
}