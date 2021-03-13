import { Router } from 'express'
import users from './users'
import surveys from './surveys'

const routes = Router()

routes.use('/users', users)
routes.use('/surveys', surveys)

export default routes