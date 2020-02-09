const userService = require('../services/users');

module.exports = {
    async create(req, res) {
        const userDTO = req.body;
        try {
            const user = await userService.createUser(userDTO);
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    async list(req, res) {
        const { login, limit } = req.query;
        try {
            const list = await userService.findList(login, limit);
            if (list) {
                res.status(200).send(list);
            } else {
                res.status(404).send('Not found!');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    async retrieve(req, res) {
        const { id } = req.params;
        try {
            const user = await userService.findOne(id);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send('Not found!');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const userDTO = req.body;
        if (!id) {
            res.status(400).send('Id is missing');
            return;
        }
        try {
            const user = await userService.updateUserById(id, userDTO);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send('Not found!');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    async destroy(req, res) {
        const { id } = req.params;
        if (!id) {
            res.status(400).send('Id is missing');
            return;
        }
        try {
            const user = await userService.deleteUserById(id);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send('Not found!');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};
