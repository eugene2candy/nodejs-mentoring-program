module.exports = {
    up: (queryInterface, Sequelize) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER
            },
            login: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
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
