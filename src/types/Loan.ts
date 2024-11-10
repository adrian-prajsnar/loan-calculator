export type LoanEntity = {
    allInstallments: number
    remainingInstallments: number
    installmentAmount: number
    financingAmount: number
    interestRate: number
}

export type UpdatedLoanEntity = {
    allInstallments: number
    remainingInstallments: number
    installmentAmount: number
    financingAmount: number
    interestRate: number
    remainingLoanToPay: number
}
