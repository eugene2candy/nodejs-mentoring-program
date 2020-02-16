const express = require('express');
const path = require('path');
const logger = require('morgan');
const rfs = require('rotating-file-stream');
const bodyParser = require('body-parser');

const app = express();

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

require('./server/routes')(app);

app.get('*', (req, res) => res.status(500).send({ message: 'Method Not Existed! ' }));
app.post('*', (req, res) => res.status(500).send({ message: 'Method Not Existed! ' }));
app.put('*', (req, res) => res.status(500).send({ message: 'Method Not Existed! ' }));
app.delete('*', (req, res) => res.status(500).send({ message: 'Method Not Existed! ' }));

process.on('uncaughtException', (err, origin) => {
    app.use(logger(`Caught exception: ${err}\nException origin: ${origin}`));
});

module.exports = app;
