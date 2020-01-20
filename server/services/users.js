const { Op } = require('sequelize');
const { User } = require('../models');

module.exports = {
    createUser(data, callback) {
        return User.create({
            login: data.body.login,
            password: data.body.password,
            age: data.body.age,
            isDeleted: false
        }).then(
            response => {
                callback(null, response);
            },
            error => {
                callback(error, null);
            }
        );
    },

    findList(data, callback) {
        let param;
        const loginExist = data.query.login === undefined;
        const limitExist = data.query.limit === undefined;

        if (!loginExist && !limitExist) {
            param = {
                where: {
                    login: {
                        [Op.iLike]: `%${data.query.login}%`
                    }
                },
                order: [['login', 'ASC']],
                limit: data.query.limit
            };
        } else if (!loginExist && limitExist) {
            param = {
                where: {
                    login: {
                        [Op.iLike]: `%${data.query.login}%`
                    }
                },
                order: [['login', 'ASC']]
            };
        } else if (loginExist && !limitExist) {
            param = {
                order: [['login', 'ASC']],
                limit: data.query.limit
            };
        } else {
            param = {
                order: [['login', 'ASC']]
            };
        }

        return User.findAll(param).then(
            response => {
                callback(null, response);
            },
            error => {
                callback(error, null);
            }
        );
    },

    findOne(data, callback) {
        return User.findByPk(data.query.id).then(
            response => {
                callback(null, response);
            },
            error => {
                callback(error, null);
            }
        );
    },

    updateUserById(data, callback) {
        return User.findByPk(data.query.id).then(user => {
            if (!user) {
                return callback('User not found');
            }
            return user
                .update({
                    login: data.body.login || user.login,
                    password: data.body.password || user.password,
                    age: data.body.age || user.age,
                    isDeleted: false
                })
                .then(
                    response => {
                        callback(null, response);
                    },
                    error => {
                        callback(error, null);
                    }
                );
        });
    },

    deleteUserById(data, callback) {
        return User.findByPk(data.query.id).then(user => {
            if (!user) {
                return callback('User not found');
            }
            return user
                .update({
                    login: user.login,
                    password: user.password,
                    age: user.age,
                    isDeleted: true
                })
                .then(
                    response => {
                        callback(null, response);
                    },
                    error => {
                        callback(error, null);
                    }
                );
        });
    }
};
