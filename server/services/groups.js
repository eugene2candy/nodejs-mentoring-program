/* eslint-disable arrow-body-style */
const { Op } = require('sequelize');
const { Group, User, UserGroup } = require('../models');
const { sequelize } = require('../models');

module.exports = {
    async createGroup({ name, permission }) {
        let element = [];
        if (typeof permission === 'string') {
            element[0] = permission;
        } else {
            element = permission;
        }
        return Group.create({
            name,
            permission: element
        });
    },

    findList() {
        return Group.findAll();
    },

    findOne(id) {
        return Group.findByPk(id);
    },

    async updateGroupById(id, { name, permission }) {
        const group = await Group.findByPk(id);
        if (!group) return group;
        return group.update({
            name: name || group.name,
            permission: permission || group.permission
        });
    },

    async addUsersToGroup(GroupId, UserIds) {
        const group = await Group.findByPk(GroupId);
        if (!group) return group;
        const users = await User.findAll({
            where: {
                id: {
                    [Op.in]: UserIds
                }
            }
        });
        if (!users) return users;

        const transaction = await sequelize.transaction();
        try {
            const usergroup = await group.addUser(users, { transaction });
            await transaction.commit();
            return usergroup;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    findUserGroupList() {
        return UserGroup.findAll();
    },

    async deleteGroupById(id) {
        const group = await Group.findByPk(id);
        if (!group) return group;
        return group.destroy();
    }
};
