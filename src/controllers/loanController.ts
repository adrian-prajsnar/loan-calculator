import { LoanEntity, UpdatedLoanEntity } from '../types/Loan'
import {
    fetchReferenceRate,
    insertDataToReferenceRateTable,
    insertDataToTable,
} from '../utils/data-service'
import sendEmail from '../utils/email'
import asyncMiddleware from '../utils/catchAsync'

const countLoan = asyncMiddleware(async (req, res) => {
    const loanData: LoanEntity = {
        allInstallments: req.body.allInstallments,
        remainingInstallments: req.body.remainingInstallments,
        installmentAmount: req.body.installmentAmount,
        financingAmount: req.body.financingAmount,
        interestRate: req.body.interestRate,
        userEmail: req.body.userEmail,
    }

    const {
        allInstallments,
        remainingInstallments,
        installmentAmount,
        financingAmount,
        interestRate,
        userEmail,
    } = loanData

    const referenceRate: number = await fetchReferenceRate()

    const referenceRateDownloadDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')

    insertDataToReferenceRateTable(referenceRateDownloadDate, referenceRate)

    if (
        Object.values(loanData).some(
            (value) => value === null || value === undefined
        )
    )
        return res.status(400).json({
            status: 'error',
            message: 'All fields are required',
        })
    else if (
        allInstallments <= 0 ||
        remainingInstallments <= 0 ||
        financingAmount <= 0 ||
        interestRate <= 0
    )
        return res.status(400).json({
            status: 'error',
            message:
                'All instalmments, remaining installments, financing amount and interest rate cannot be less or equal 0',
        })
    else if (installmentAmount <= 0) {
        sendEmail({
            email: userEmail,
            subject: 'Issue with Your Installment Amount',
            message:
                "Dear User. It appears that the installment amount you've entered is not valid. Installments must be a positive amount greater than zero. Please review and update your information to proceed with your loan application If you need assistance, feel free to contact our support team. Best regards, Your Support Team",
        })
        return res.status(400).json({
            status: 'error',
            message: 'Installment amount cannot be less or equal 0',
        })
    }

    if (interestRate > referenceRate)
        return res.status(200).json({
            status: 'warning',
            message: 'Interest rate is bigger than reference rate',
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
})

export { countLoan }
