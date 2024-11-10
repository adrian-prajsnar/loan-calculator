import app from './app'
import { initDbConnection } from './db/db'

async function main() {
    try {
        const connection = await initDbConnection()

        const [rows] = await connection.query('SELECT 1 + 1 AS result')
        console.log('Query result:', rows)

        await connection.end()
    } catch (error) {
        console.error('Error:', error)
    }
}

main()

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}`)
)
