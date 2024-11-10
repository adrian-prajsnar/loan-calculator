import mysql from 'mysql2/promise'
import { dbConfig } from './config'

export async function initDbConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig)
        console.log('Connected to the MySQL database.')
        return connection
    } catch (error) {
        console.error('Unable to connect to the database:', error)
        throw error
    }
}
