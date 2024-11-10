import express from 'express'
import dotenv from 'dotenv'
import loanRouter from './routes/loanRoutes'

dotenv.config({
    path: '.env',
})

const app = express()

app.use(express.json({ limit: '10kb' }))

app.use('/api/v1/loan', loanRouter)

export default app
