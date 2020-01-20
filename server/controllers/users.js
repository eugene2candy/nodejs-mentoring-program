const userService = require('../services/users');

module.exports = {
    create(req, res) {
        return userService.createUser(req, (error, response) => {
            if (response) {
                res.status(200).send(response);
            } else if (error) {
                res.status(400).send(error);
            }
        });
    },

    list(req, res) {
        return userService.findList(req, (error, response) => {
            if (response) {
                res.status(200).send(response);
            } else if (error) {
                res.status(400).send(error);
            } else if (!response) {
                res.status(204).send('No data found');
            }
        });
    },

    retrieve(req, res) {
        return userService.findOne(req, (error, response) => {
            if (response) {
                res.status(200).send(response);
            } else if (error) {
                res.status(400).send(error);
            } else if (!response) {
                res.status(204).send('No data found');
            }
        });
    },

    update(req, res) {
        if (!req.query.id) {
            res.status(400).send('Id is missing');
            return;
        }
        userService.updateUserById(req, (error, response) => {
            if (response) {
                res.status(200).send(response);
            } else if (error) {
                res.status(400).send(error);
            }
        });
    },

    destroy(req, res) {
        if (!req.query.id) {
            res.status(400).send('Id is missing');
            return;
        }
        userService.deleteUserById(req, (error, response) => {
            if (response) {
                res.status(200).send(response);
            } else if (error) {
                res.status(400).send(error);
            }
        });
    }
};
