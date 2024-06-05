require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./BACKEND API/routes')
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors());
app.use(routes);
require('./BACKEND API/database/database').connectDB();


module.exports = app;
