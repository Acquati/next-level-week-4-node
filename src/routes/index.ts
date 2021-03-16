import { Router } from 'express'
import users from './users'
import surveys from './surveys'
import sendMail from './sendMail'

const routes = Router()

routes.use('/users', users)
routes.use('/surveys', surveys)
routes.use('/send-mail', sendMail)

export default routes