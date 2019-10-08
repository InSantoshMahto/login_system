const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const logger = require('morgan');

const config = require('./config'); // configuration
const routes = require('./routes'); //  routing

const PORT = process.env.PORT || config.port; // defining port number

const app = express(); //creating express app

app.disable('etag');

app.disable('x-powered-by');

// configuration for MIME type
app.use(express.json(config.json));

// for logging the routes
app.use(logger('dev'));

// for dotenv
if (dotenv.error) throw dotenv.error;
console.info(`key added in env by dotenv are:\n`, dotenv.parsed);

// public directory setup
app.use(express.static(path.join(__dirname, 'public'), config.static));

/* ======================= set up  for routes ========================== */
app.use('/', routes);

// listening port number
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
