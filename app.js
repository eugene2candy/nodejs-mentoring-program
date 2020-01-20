const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./server/routes')(app);

app.get(
    '*',
    (req, res) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        res.status(200).send({
            message: 'Welcome! '
        })
    // eslint-disable-next-line function-paren-newline
);

module.exports = app;
