/* eslint-disable arrow-body-style */
const groupService = require('../services/groups');
const { sequelize } = require('../models');

module.exports = {
    async create(req, res) {
        const groupDTO = req.body;
        try {
            const group = await groupService.createGroup(groupDTO);
            res.status(200).send(group);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    async list(req, res) {
        try {
            const list = await groupService.findList();
            if (list) {
                res.status(200).send(list);
            } else {
                res.status(404).send('Not found!');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    async userGroupList(req, res) {
        try {
            const list = await groupService.findUserGroupList();
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
            const group = await groupService.findOne(id);
            if (group) {
                res.status(200).send(group);
            } else {
                res.status(404).send('Not found!');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const groupDTO = req.body;
        if (!id) {
            res.status(404).send('Id is missing');
            return;
        }
        try {
            const group = await groupService.updateGroupById(id, groupDTO);
            if (group) {
                res.status(200).send(group);
            } else {
                res.status(404).send('Not found!');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    async addUser(req, res) {
        const { GroupId, UserId } = req.body;
        if (!GroupId) {
            res.status(404).send('GroupId is missing');
            return;
        }
        if (!UserId) {
            res.status(404).send('UserId is missing');
            return;
        }
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const usergroup = await groupService.addUsersToGroup(GroupId, UserId, { transaction });
            if (usergroup) {
                await transaction.commit();
                res.status(200).send(usergroup);
            } else {
                await transaction.rollback();
                res.status(404).send('Relation Existed! ');
            }
        } catch (error) {
            await transaction.rollback();
            res.status(400).send(error.message);
        }
    },

    async destroy(req, res) {
        const { id } = req.params;
        if (!id) {
            res.status(404).send('Id is missing');
            return;
        }
        try {
            const group = await groupService.deleteGroupById(id);
            if (group) {
                res.status(200).send(group);
            } else {
                res.status(404).send('Not found!');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};
