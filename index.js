require('dotenv').config()

const express = require('express')

const PORT = process.env.PORT || 5000

const authRoutes = require('./src/routes/auth')

const middlewareLogRequest = require('./src/middleware/logs')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(middlewareLogRequest)

app.use('/auth', authRoutes)


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})