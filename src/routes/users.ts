import { Router } from 'express'
import { UsersController } from '../controllers/UsersController'

const router = Router()

// Get all users
router.get(
  '/',
  UsersController.listAll
)

// Get one user
router.get(
  '/:id',
  UsersController.getOneById
)

//Create a new user
router.post(
  '/',
  UsersController.create
)

// Delete one user
router.delete(
  '/:id',
  UsersController.delete
)

export default router