const {readFileSync} = require('fs')
const mongoose = require('mongoose')
require('colors')
const dotenv = require('dotenv')

//Load env vars
dotenv.config(({path: './src/config/config.env'}))

const Bootcamp = require('./src/models/Bootcamp')
const Course = require('./src/models/Course')


//Connect to db
const connect = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`Mongo DB connected ${conn.connection.host}`.cyan.underline.bold)
}
connect()
//Read JSON files
const bootcamps = JSON.parse(readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

const courses = JSON.parse(readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'))

//Imports into db
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps)
        await Course.create(courses)
        console.log('Data imported...'.green.inverse)
        process.exit()
    } catch (e) {
        console.error(e)
    }
}

const deleteData = async () => {
    try {
        await Bootcamp.deleteMany()
        await Course.deleteMany()
        console.log('Data destroyed...'.red.inverse)
        process.exit()
    } catch (e) {
        console.error(e)
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
}
