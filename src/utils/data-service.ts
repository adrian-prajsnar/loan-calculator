import axios from 'axios'
import xml2js from 'xml2js'
import { connectToDatabase, queryToDatabase } from '../db/db'
import { UpdatedLoanEntity } from '../types/Loan'

async function fetchReferenceRate(): Promise<number> {
    try {
        const response = await axios.get(
            'https://static.nbp.pl/dane/stopy/stopy_procentowe.xml'
        )

        const data = await xml2js.parseStringPromise(response.data)

        const referenceRateString: string =
            data.stopy_procentowe.tabela[0].pozycja[0].$.oprocentowanie

        const referenceRate: number = Number(
            referenceRateString.replace(',', '.')
        )

        return referenceRate
    } catch (error) {
        console.error('Error fetching reference rate:', error)
        throw error
    }
}

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

        const queryString = `INSERT INTO Loan (allInstallments, remainingInstallments, installmentAmount, financingAmount, interestRate, remainingLoan) VALUES ("${loanData.allInstallments}", "${loanData.remainingInstallments}","${loanData.installmentAmount}","${loanData.financingAmount}","${loanData.interestRate}","${loanData.remainingLoanToPay}")`

        await queryToDatabase(connection, queryString)

        connection.end()
    } catch (error) {
        console.error('Error:', error)
    }
}

export { fetchReferenceRate, insertDataToReferenceRateTable, insertDataToTable }
