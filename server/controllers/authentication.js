const jwt = require('jsonwebtoken');
const authenticationService = require('../services/authentication');

const secret = process.env.JWT_SECRET;

module.exports = {
    async authenticate(req, res) {
        const { username, password } = req.body;
        if (!username) {
            res.status(400).send('username is missing');
            return;
        }
        if (!password) {
            res.status(400).send('password is missing');
            return;
        }
        try {
            const token = await authenticationService.login(username, password);
            if (token) {
                res.status(200).send(token);
            } else {
                res.status(403).send('username/password combination error or user does not exist');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    checkToken(req, res, next) {
        const token = req.headers.authentication.replace('Bearer ', '');
        if (!token) {
            res.status(401).send({ success: false, message: 'No token provided' });
        }
        return jwt.verify(token, secret, err => {
            if (err) {
                return res.status(403).send({ success: false, message: 'invalid token' });
            }
            return next();
        });
    }
};
