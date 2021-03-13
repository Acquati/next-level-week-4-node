import { Router } from 'express'
import { SurveysController } from '../controllers/SurveysController'

const router = Router()

//Create a new survey
router.post(
  '/',
  SurveysController.create
)
export default router