const uuid = require('uuid/v4');

module.exports = {
    up: (queryInterface, Sequelize) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        queryInterface.createTable('Users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: uuid(),
                primaryKey: true
            },
            login: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            age: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            isDeleted: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users')
};
