import express from 'express'
import { countLoan } from '../controllers/loan.controller'

const loanRouter = express.Router()

loanRouter.post('/', countLoan)

export default loanRouter
