import express from 'express'
import { countLoan } from '../controllers/loanController'

const loanRouter = express.Router()

loanRouter.post('/', countLoan)

export default loanRouter
