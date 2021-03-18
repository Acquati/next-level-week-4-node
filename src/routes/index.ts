import { Router } from 'express'
import users from './users'
import surveys from './surveys'
import sendMail from './sendMail'
import answers from './answers'
import nps from './nps'

const routes = Router()

routes.use('/users', users)
routes.use('/surveys', surveys)
routes.use('/send-mail', sendMail)
routes.use('/answers', answers)
routes.use('/nps', nps)

export default routes