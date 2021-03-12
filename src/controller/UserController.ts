import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'

export class UserController {
  static listAll = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    const users = await userRepository.find()
    return response.status(200).send(users)
  }

  static getOneById = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne(request.params.id)
    return response.status(200).send(user)
  }

  static create = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    const user = await userRepository.save(request.body)
    return response.status(200).send(user)
  }

  static delete = async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = getRepository(User)
    let userToRemove = await userRepository.findOne(request.params.id)
    await userRepository.remove(userToRemove)
    const users = await userRepository.find()
    return response.status(200).send(users)
  }
}