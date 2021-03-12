import * as express from 'express'
import * as cors from 'cors'
import * as helmet from 'helmet'
import routes from '../routes'

// Create a new express application instance
const app = express()

// Call midlewares
app.use(express.json())
app.use(cors())
app.use(helmet())

//Set all routes from routes folder
app.use('/', routes)

export { app }