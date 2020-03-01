const express = require('express');
const path = require('path');
const logger = require('morgan');
const rfs = require('rotating-file-stream');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

process.on('uncaughtException', (err, origin) => {
    console.log('This is uncaught exception');
    console.log(`Caught exception: ${err}\nException origin: ${origin}`);
    console.log(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('unhandled rejection at: ', promise, 'reason: ', reason);
    process.exit(1);
});

const whitelist = ['http://example1.com', 'http://example2.com'];
const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
});

let getMethods = 0;
let postMethods = 0;
let putMethods = 0;
let deleteMethods = 0;

logger.token('getMethod', req => {
    let currentMethod;
    if (req.method === 'GET') {
        getMethods += 1;
        currentMethod = getMethods;
    } else if (req.method === 'POST') {
        postMethods += 1;
        currentMethod = postMethods;
    } else if (req.method === 'PUT') {
        putMethods += 1;
        currentMethod = putMethods;
    } else if (req.method === 'DELETE') {
        deleteMethods += 1;
        currentMethod = deleteMethods;
    }
    return `${req.method} Methods called: ${currentMethod} time(s)`;
});

logger.token('body', req => `Passing Form: ${JSON.stringify(req.body)}`);
logger.token('err', res => res.res.statusMessage);

const loggerFormat = 'Log Message: [:date[web]] ":method :url" [Status Code: :status] [Response Time: :response-time ms] [:body] :err';

app.use(logger(loggerFormat));
app.use(logger(':getMethod'));
app.use(logger(loggerFormat, { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors(corsOptionsDelegate));
require('./server/routes')(app);

app.all('*', (req, res) => res.status(404).send({ message: 'Not Found' }));

module.exports = app;
