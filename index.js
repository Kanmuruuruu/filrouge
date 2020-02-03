require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./database');

const students = require("./app/routes/students.routes");

// Create app
const app = express();

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Get all the routes for Students.
app.use("/students", students);

// Set port, listen for requests
app.listen(
  process.env.PORT || 3000,
  () => console.log(`Server is running on port ${process.env.PORT || 3000}.`)
);
