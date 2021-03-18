import { Router } from 'express'
import { NpsController } from '../controllers/NpsController'

const router = Router()

router.get(
  '/:survey_id',
  NpsController.execute
)

export default router