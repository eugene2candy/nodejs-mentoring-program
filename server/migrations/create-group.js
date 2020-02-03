module.exports = {
    up: (queryInterface, Sequelize) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        queryInterface.createTable('Groups', {
            id: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            name: {
                unique: true,
                type: Sequelize.STRING,
                allowNull: false
            },
            permission: {
                type: Sequelize.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'),
                allowNull: false
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
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Groups')
};
