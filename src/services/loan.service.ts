import { LoanEntity, UpdatedLoanEntity } from '../types/Loan'
import { isValidEmail } from './email.service'

export function validateLoanData(loanData: LoanEntity): string | null {
    const {
        allInstallments,
        remainingInstallments,
        financingAmount,
        interestRate,
        userEmail,
    } = loanData

    if (
        Object.values(loanData).some(
            (value) => value === null || value === undefined || value === ''
        ) ||
        !isValidEmail(userEmail)
    )
        return 'All fields are required and email has to be in proper syntax'

    if (
        allInstallments <= 0 ||
        remainingInstallments <= 0 ||
        financingAmount <= 0 ||
        interestRate <= 0
    )
        return 'All installments, remaining installments, financing amount, and interest rate must be greater than 0'

    return null
}

export function calculateLoanAmounts(
    loanData: LoanEntity,
    referenceRate: number
): UpdatedLoanEntity {
    const { remainingInstallments, installmentAmount } = loanData

    const newContractLoanAmount = parseFloat(
        (
            remainingInstallments *
            installmentAmount *
            (referenceRate / 100 + 1)
        ).toFixed(2)
    )

    const newInstallmentAmount = parseFloat(
        (installmentAmount * (referenceRate / 100 + 1)).toFixed(2)
    )

    return {
        ...loanData,
        installmentAmount: newInstallmentAmount,
        remainingLoanToPay: newContractLoanAmount,
    }
}
