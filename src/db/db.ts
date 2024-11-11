import mysql from 'mysql2/promise'
import { dbConfig } from './config'

export async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(dbConfig)
        return connection
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        throw error
    }
}

export async function queryToDatabase(
    connection: mysql.Connection,
    queryString: string
) {
    try {
        const data = await connection.query(queryString)
        return data
    } catch (error) {
        console.error('Error:', error)
    }
}
