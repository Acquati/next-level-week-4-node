import { Router } from 'express'
import { UsersController } from '../controllers/UsersController'

const router = Router()

router.get(
  '/',
  UsersController.listAll
)
router.get(
  '/:id',
  UsersController.getOneById
)
router.post(
  '/',
  UsersController.create
)
router.delete(
  '/:id',
  UsersController.delete
)

export default router