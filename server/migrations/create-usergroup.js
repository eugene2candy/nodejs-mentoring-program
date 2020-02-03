module.exports = {
    up: (queryInterface, Sequelize) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        queryInterface.createTable('UserGroups', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userId'
                }
            },
            groupId: {
                type: Sequelize.UUID,
                onDelete: 'CASCADE',
                references: {
                    model: 'Groups',
                    key: 'id',
                    as: 'groupId'
                }
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
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('UserGroups')
};
