/* eslint-disable arrow-body-style */
const { Group, User, UserGroup } = require('../models');

module.exports = {
    async createGroup({ name, permission }) {
        return Group.create({
            name,
            permission
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
        if (group) {
            return group.update({
                name: name || group.name,
                permission: permission || group.permission
            });
        }
        return Group.findByPk(id);
    },

    async addUsersToGroup(GroupId, UserId) {
        const group = await Group.findByPk(GroupId);
        if (group) {
            const user = await User.findByPk(UserId);
            if (user) {
                const usergroup = await group.addUser(user);
                return usergroup;
            }
            return User.findByPk(UserId);
        }
        return Group.findByPk(GroupId);
    },

    findUserGroupList() {
        return UserGroup.findAll();
    },

    async deleteGroupById(id) {
        const group = await Group.findByPk(id);
        if (group) {
            return group.destroy();
        }
        return Group.findByPk(id);
    }
};
