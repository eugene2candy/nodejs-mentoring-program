const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

module.exports = {
    async login(username, password) {
        const user = User.findOne({ where: { login: username, password, isDeleted: false } });
        if (!user) return user;
        const payload = { sub: user.id, login: user.login };
        return jwt.sign(payload, secret, { expiresIn: 120 });
    }
};
