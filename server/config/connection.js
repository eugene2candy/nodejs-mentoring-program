const mongoose = require('mongoose');

// We need to difine the URL
const URL = process.env.URL || 'mongodb://localhost/hw2';

mongoose.set('useCreateIndex', true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// Connection establishment
mongoose.connect(URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
// Models
// require('../model/user');
const db = mongoose.connection;

// We enebled the Listener
db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    console.log('DB Connection established successfully');
});
