const { Op } = require('sequelize');
const { User, UserGroup } = require('../models');

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
