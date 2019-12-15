const userService = require('../service/user');

exports.create = (req, res, next) => {
    const body = new User(req.body);
    userService.createUser(body, (error, response) => {
        if (response) {
            res.status(201).send(response);
        } else if (error) {
            res.status(400).send(error);
        }
    });
};

exports.find = (req, res) => {
    const params = req.params || {};
    const query = {
        id: params.id
    };
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    userService.findUser(query, (error, response) => {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
        }
    });
};

exports.findAll = (req, res) => {
    userService.findUsers({}, (error, response) => {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
        }
    });
};

exports.updateById = (req, res) => {
    const body = new User(req.body);
    if (!body.id) {
        res.status(400).send('Id is missing');
        return;
    }
    const updateData = body || {};
    userService.updateUserById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
};

exports.deleteById = (req, res) => {
    const body = new User(req.body);
    if (!body.id) {
        res.status(400).send('Id is missing');
        return;
    }
    const updateData = { isDeleted: true };
    userService.deleteUser(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
};

class User {
    constructor(userData) {
        this.id = userData.id || '';
        this.login = userData.login || '';
        this.password = userData.password || '';
        this.age = userData.age || '';
        this.isDeleted = userData.isDeleted || '';
    }
}
