const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { User, UserGroup } = require('../models');

const secret = 'nodejsmentoringprogram';

module.exports = {
    createUser({ login, password, age }) {
        return User.create({
            login,
            password,
            age,
            isDeleted: false
        });
    },

    findList(login, limit) {
        const loginExist = login !== undefined;
        const limitExist = limit !== undefined;

        const param = {
            order: [['login', 'ASC']]
        };

        if (loginExist) {
            param.where = {
                login: {
                    [Op.iLike]: `%${login}%`
                }
            };
        }

        if (limitExist) {
            param.limit = limit;
        }

        return User.findAll(param);
    },

    findOne(id) {
        return User.findByPk(id);
    },

    async login(username, password) {
        const user = User.findOne({ where: { login: username, password, isDeleted: false } });
        if (!user) return user;
        const payload = { sub: user.id, login: user.login };
        return jwt.sign(payload, secret, { expiresIn: 120 });
    },

    async updateUserById(id, { login, password, age }) {
        const user = await User.findByPk(id);
        if (!user) return user;
        return user.update({
            login: login || user.login,
            password: password || user.password,
            age: age || user.age,
            isDeleted: false
        });
    },

    async deleteUserById(id) {
        const user = await User.findByPk(id);
        if (!user) return user;
        await UserGroup.destroy({
            where: {
                userId: id
            }
        });
        return user.update({
            login: user.login,
            password: user.password,
            age: user.age,
            isDeleted: true
        });
    }
};
