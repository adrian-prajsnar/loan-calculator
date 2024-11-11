import { NextFunction, Request, Response } from 'express'
import { LoanEntity, UpdatedLoanEntity } from '../types/Loan'
import {
    fetchReferenceRate,
    insertDataToReferenceRateTable,
    insertDataToTable,
} from '../utils/data-service'
import sendEmail from '../utils/email'

async function countLoan(req: Request, res: Response, next: NextFunction) {
    try {
        const loanData: LoanEntity = {
            allInstallments: req.body.allInstallments,
            remainingInstallments: req.body.remainingInstallments,
            installmentAmount: req.body.installmentAmount,
            financingAmount: req.body.financingAmount,
            interestRate: req.body.interestRate,
        }

        const { remainingInstallments, installmentAmount, interestRate } =
            loanData

        const referenceRate: number = await fetchReferenceRate()

        const referenceRateDownloadDate = new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ')

        insertDataToReferenceRateTable(referenceRateDownloadDate, referenceRate)
        if (interestRate > referenceRate)
            res.status(200).json({
                status: 'success',
                message: 'Interest rate is bigger than reference rate',
            })
        else {
            if (installmentAmount <= 0)
                sendEmail({
                    email: 'test@gmail.com',
                    subject: 'TEST',
                    message: 'xyzzxczczccz...',
                })

            const newContractLoanAmount: number = parseFloat(
                (
                    remainingInstallments *
                    installmentAmount *
                    (referenceRate / 100 + 1)
                ).toFixed(2)
            )

            const newInstallmentAmount: number = parseFloat(
                (installmentAmount * (referenceRate / 100 + 1)).toFixed(2)
            )

            const newCountedLoanData: UpdatedLoanEntity = {
                ...loanData,
                installmentAmount: newInstallmentAmount,
                remainingLoanToPay: newContractLoanAmount,
            }
            insertDataToTable(newCountedLoanData)

            res.status(200).json({
                status: 'success',
                entity: newCountedLoanData,
            })
        }
    } catch (error) {
        next(error)
    }
}

export { countLoan }
