const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./BACKEND API/routes/index')
const app = express();
require('./BACKEND API/database/database').connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors());
app.use(routes);

module.exports = app;
