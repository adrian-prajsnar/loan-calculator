import { UpdatedLoanEntity } from '../types/Loan'
import { connectToDatabase, queryToDatabase } from './db'

async function insertDataToReferenceRateTable(
    creationDate: string,
    referenceRate: number
) {
    try {
        const connection = await connectToDatabase()

        const queryString = `INSERT INTO ReferenceRate (creationDate, referenceRate) VALUES ("${creationDate}", "${referenceRate}")`
        await queryToDatabase(connection, queryString)

        connection.end()
    } catch (error) {
        console.error('Error:', error)
    }
}

async function insertDataToTable(loanData: UpdatedLoanEntity) {
    try {
        const connection = await connectToDatabase()

        const queryString = `INSERT INTO Loan (allInstallments, remainingInstallments, installmentAmount, financingAmount, interestRate, remainingLoanToPay) VALUES ("${loanData.allInstallments}", "${loanData.remainingInstallments}","${loanData.installmentAmount}","${loanData.financingAmount}","${loanData.interestRate}","${loanData.remainingLoanToPay}")`

        await queryToDatabase(connection, queryString)

        connection.end()
    } catch (error) {
        console.error('Error:', error)
    }
}

export { insertDataToReferenceRateTable, insertDataToTable }
