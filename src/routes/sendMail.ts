import { Router } from 'express'
import { SendMailController } from '../controllers/SendMailController'

const router = Router()

router.post(
  '/',
  SendMailController.execute
)

export default router