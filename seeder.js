const { readFileSync } = require('fs');
const mongoose = require('mongoose');
require('colors');
const dotenv = require('dotenv');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Load models
const Bootcamp = require('./src/models/Bootcamp');
const Course = require('./src/models/Course');
const User = require('./src/models/User');
const Review = require('./src/models/Review');

//Connect to db
const connect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Mongo DB connected ${conn.connection.host}`.cyan.underline.bold);
};
connect();
//Read JSON files
const bootcamps = JSON.parse(
  readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
  readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

const users = JSON.parse(
  readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

const reviews = JSON.parse(
  readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
);

//Imports into db
const importData = async (exitAfter = true) => {
  try {
    //Create new data in DB
    await User.create(users);
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    await Review.create(reviews);

    console.log('Data imported...'.green.inverse);
    exitAfter && process.exit();
  } catch (e) {
    console.error(e);
  }
};

const deleteData = async (exitAfter = true) => {
  try {
    //Delete data from DB
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log('Data destroyed...'.red.inverse);
    exitAfter && process.exit();
  } catch (e) {
    console.error(e);
  }
};

const updateData = async () => {
  try {
    await deleteData(false);
    await importData(false);
    process.exit();
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else if (process.argv[2] === '-u') {
  updateData();
}
