import { NextFunction, Request, Response } from 'express'
import app from './app'
import { LoanRequest } from './types/Loan'
import { fetchReferenceRate } from './utils/data-service'

app.get('/', (req, res) => {
    res.send('GET Request called')
})

app.post(
    '/api/v1/loan',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const loanData: LoanRequest = {
                allInstallments: req.body.allInstallments,
                remainingInstallments: req.body.remainingInstallments,
                installmentAmount: req.body.installmentAmount,
                financingAmount: req.body.financingAmount,
                interestRate: req.body.interestRate,
            }

            const {
                allInstallments,
                remainingInstallments,
                installmentAmount,
                financingAmount,
                interestRate,
            } = loanData

            const referenceRate = await fetchReferenceRate()
            const referenceRateDownloadDate: Date = new Date()

            console.log(referenceRate, referenceRateDownloadDate)

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

                console.log(newContractLoanAmount)
                console.log(newInstallmentAmount)

                res.status(200).json({
                    status: 'success',
                    entity: loanData,
                })
            }
        } catch (error) {
            next(error)
        }
    }
)

app.listen(3000, () => console.log('App listening on port 3000'))
