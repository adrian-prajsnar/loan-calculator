import { NextFunction, Request, Response } from 'express'
import { LoanEntity } from '../types/Loan'
import { fetchReferenceRate } from '../utils/api'
import { sendEmail } from '../services/email.service'
import {
    validateLoanData,
    calculateLoanAmounts,
} from '../services/loan.service'
import {
    insertDataToReferenceRateTable,
    insertDataToTable,
} from '../db/actions'

async function countLoan(req: Request, res: Response, next: NextFunction) {
    try {
        const loanData: LoanEntity = {
            allInstallments: req.body.allInstallments,
            remainingInstallments: req.body.remainingInstallments,
            installmentAmount: req.body.installmentAmount,
            financingAmount: req.body.financingAmount,
            interestRate: req.body.interestRate,
            userEmail: req.body.userEmail,
        }

        const { interestRate, installmentAmount, userEmail } = loanData

        const validationError = validateLoanData(loanData)

        const referenceRate = await fetchReferenceRate()
        const referenceRateDownloadDate = new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')

        insertDataToReferenceRateTable(referenceRateDownloadDate, referenceRate)

        if (validationError) {
            res.status(400).json({ status: 'error', message: validationError })
        } else if (interestRate > referenceRate)
            res.status(200).json({
                status: 'success',
                message:
                    'Interest rate is bigger than reference rate, nothing changed',
            })
        else {
            if (installmentAmount <= 0) {
                sendEmail({
                    email: userEmail,
                    subject: 'Issue with Your Installment Amount',
                    message:
                        "Dear User. It appears that the installment amount you've entered is not valid. Installments must be a positive amount greater than zero. Please review and update your information to proceed with your loan application. If you need assistance, feel free to contact our support team. Best regards, Your Support Team",
                })
                res.status(400).json({
                    status: 'error',
                    message: 'Installment amount cannot be less or equal to 0',
                })
            } else {
                const newCountedLoanData = calculateLoanAmounts(
                    loanData,
                    referenceRate
                )

                insertDataToTable(newCountedLoanData)

                res.status(200).json({
                    status: 'success',
                    entity: newCountedLoanData,
                })
            }
        }
    } catch (error) {
        next(error)
    }
}

export { countLoan }
