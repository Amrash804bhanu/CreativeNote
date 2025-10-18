import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import notesRoutes from './Routes/notesRoutes.js'
import { connectDB } from './config/db.js'
// import ratelimit from './config/upstash.js'
import rateLimiter from './middlewares/ratelimiters.js'

// console.log('MONGO_URI:', process.env.MONGO_URI)
// console.log('PORT:', process.env.PORT)

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
connectDB()

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)
app.use(express.json()) // to use title and content we need middleware
app.use(rateLimiter)

app.use(express.urlencoded({ extended: true }))

// Connect to database with error handling
const startServer = async () => {
  try {
    await connectDB()

    app.use('/api/notes', notesRoutes)

    app.listen(PORT, () => {
      console.log(`server started on port:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
