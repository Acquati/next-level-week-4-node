import { Router } from 'express'
import { AnswerController } from '../controllers/AnswerController'

const router = Router()

router.get(
  '/:value',
  AnswerController.execute
)

export default router