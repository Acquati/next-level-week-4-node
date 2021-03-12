import { Router } from 'express'
import { UserController } from '../controller/UserController'

const router = Router()

// Get all users
router.get(
  '/',
  UserController.listAll
)

// Get one user
router.get(
  '/:id',
  UserController.getOneById
)

//Create a new user
router.post(
  '/',
  UserController.create
)

// Delete one user
router.delete(
  '/:id',
  UserController.delete
)

export default router