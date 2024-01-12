require('dotenv').config()

const express = require('express')

const PORT = process.env.PORT || 5000

const authRoutes = require('./src/routes/auth')

const middlewareLogRequest = require('./src/middleware/logs')

const app = express()

app.use(middlewareLogRequest)

app.use(express.json())

app.use('/auth', authRoutes)


// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})