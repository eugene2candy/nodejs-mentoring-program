const userService = require('../service/user');

exports.create = (req, res) => {
    const { body } = req;
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
    const query = req.query || {};
    // eslint-disable-next-line no-console
    console.log(query); // { sort: '-1', limit: '3' }
    const login = String(query.login) || null;
    const limit = Number(query.limit);
    userService.findUsers(login, limit, (error, response) => {
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
    const params = req.params || {};
    const query = {
        id: params.id
    };
    if (!query) {
        res.status(400).send('Id is missing');
        return;
    }
    const updateData = req.body || {};
    userService.updateUserById(query, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
};

exports.deleteById = (req, res) => {
    const params = req.params || {};
    const query = {
        id: params.id
    };
    if (!query) {
        res.status(400).send('Id is missing');
        return;
    }
    const updateData = { isDeleted: true };
    userService.deleteUser(query, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
};
