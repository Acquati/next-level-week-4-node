import { Router } from 'express'
import { SurveysController } from '../controllers/SurveysController'

const router = Router()

router.get(
  '/',
  SurveysController.listAll
)
router.post(
  '/',
  SurveysController.create
)

export default router