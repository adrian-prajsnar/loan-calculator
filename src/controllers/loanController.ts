import { NextFunction, Request, Response } from 'express'
import { LoanRequest } from '../types/Loan'
import { fetchReferenceRate } from '../utils/data-service'
import sendEmail from '../utils/email'

export async function countLoan(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const data: LoanRequest = {
            allInstallments: req.body.allInstallments,
            remainingInstallments: req.body.remainingInstallments,
            installmentAmount: req.body.installmentAmount,
            financingAmount: req.body.financingAmount,
            interestRate: req.body.interestRate,
        }

        const { remainingInstallments, installmentAmount, interestRate } = data

        const referenceRate: number = await fetchReferenceRate()
        const referenceRateDownloadDate: Date = new Date()

        if (interestRate > referenceRate)
            res.status(200).json({
                status: 'success',
                message: 'Interest rate is bigger than reference rate',
            })
        else {
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

            if (newInstallmentAmount <= 0)
                sendEmail({
                    email: 'test@gmail.com',
                    subject: 'TEST',
                    message: 'xyzzxczczccz...',
                })

            res.status(200).json({
                status: 'success',
                entity: data,
            })
        }
    } catch (error) {
        next(error)
    }
}
