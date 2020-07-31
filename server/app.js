const path = require('path');
const express = require('express');
const router = require('./src/routes/router');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// packages for logging
const morgan = require('morgan');
const winston = require('./config/winston');

const app = express();

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// security with helmet
app.use(helmet());

app.use(
    cors({
        origin: ['http://localhost:8080'],
    })
);

// compression of requests
app.use(compression({ filter: shouldCompress }));
function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
}

app.use(
    morgan('[:date[clf]] :status :method :url - :response-time ms ', {
        stream: winston.stream,
    })
);

app.use('/api', router);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.status(404).send('Not found');
});

module.exports = app;
