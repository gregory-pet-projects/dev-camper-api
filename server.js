const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bootcamps = require('./src/routes/bootcamps')
const connectDB = require('./src/config/db')
require('colors')

dotenv.config({path: './src/config/config.env'})

const app = express()

connectDB()

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 3300
const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

//Handler unhandled promise rejections
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`.red)
    server.close(()=>process.exit(1))
})