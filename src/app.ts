import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import loanRouter from './routes/loanRoutes'

dotenv.config({
    path: '.env',
})

const app = express()

app.use(
    cors({
        origin: 'http://localhost:5173',
    })
)

app.use(express.json({ limit: '10kb' }))

app.use('/api/v1/loan', loanRouter)

export default app
