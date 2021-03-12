import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'

export class UserController {
  static listAll = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    const users = await userRepository.find()
    return response.status(200).json(users)
  }

  static getOneById = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne(request.params.id)
    return response.status(200).json(user)
  }

  static create = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    const { name, email } = request.body

    const user = userRepository.create({
      name,
      email
    })

    try {
      await userRepository.save(user)
    } catch (error) {
      return response.status(409).json({ message: 'Email or username already in use. ' + error })
    }
    return response.status(200).json({ message: 'User created successfully.' })
  }

  static delete = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    let userToRemove = await userRepository.findOne(request.params.id)
    await userRepository.remove(userToRemove)
    const users = await userRepository.find()
    return response.status(200).json(users)
  }
}