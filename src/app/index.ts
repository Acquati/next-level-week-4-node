import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
// import express, { Request, Response, NextFunction } from 'express'
// import 'express-async-errors'
import cors from 'cors'
import helmet from 'helmet'
import routes from '../routes'
import { AppError } from '../errors/AppError'

// Create a new express application instance
const app = express()

// Call middleware
app.use(express.json())
app.use(cors())
app.use(helmet())
// app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
//   if (error instanceof AppError) {
//     return response.status(error.statusCode).json({ error: error.message })
//   }

//   return response.status(500).json({
//     status: 'Error',
//     message: `Internal server error ${error.message}`
//   })
// })

// Set all routes from routes folder
app.use('/', routes)

export { app }