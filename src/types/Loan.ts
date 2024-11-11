type LoanEntity = {
    allInstallments: number
    remainingInstallments: number
    installmentAmount: number
    financingAmount: number
    interestRate: number
    userEmail: string
}

type UpdatedLoanEntity = {
    allInstallments: number
    remainingInstallments: number
    installmentAmount: number
    financingAmount: number
    interestRate: number
    remainingLoanToPay: number
}

export { LoanEntity, UpdatedLoanEntity }
