require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./BACKEND API/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(cors());
app.use(routes);
require('./BACKEND API/database/database').connectDB();

app.use((err, req, res, next) => {
	const statusCode = err.statusCode ? err.statusCode : 500;
	const message = err.message ? err.message : 'Internal server error';
	return res.status(statusCode).json({ success: false, message });
});

module.exports = app;
