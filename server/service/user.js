const mongoose = require('mongoose');
const user = mongoose.model('User');

exports.createUser = (data, callback) => {
    user.create(data).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};

exports.findUser = (query, callback) => {
    user.findOne(query, callback);
};

exports.findUsers = (query, callback) => {
    // sorted by login property and limited users
    user.find(query, callback).sort({ 'login': 1 }).limit(2);
};

exports.updateUserById = (query, data, options, callback) => {
    user.findOneAndUpdate(query, data, options, (err, response) => {
        callback(err, response);
    });
};

exports.deleteUser = (query, data, options, callback) => {
    user.findOneAndUpdate(query, data, options, (err, response) => {
        callback(err, response);
    });
};
