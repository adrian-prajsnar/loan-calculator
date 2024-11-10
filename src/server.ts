import app from './app'

// async function main() {
//     try {
//         const connection = await connectToDatabase()

//         const [rows] = await connection.query('SELECT 1 + 1 AS result')
//         console.log('Query result:', rows)

//         connection.end()
//     } catch (error) {
//         console.error('Error:', error)
//     }
// }

// main()

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})
