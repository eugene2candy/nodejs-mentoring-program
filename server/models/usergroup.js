module.exports = (sequelize, DataTypes) => {
    const UserGroup = sequelize.define('UserGroup', {
        userId: DataTypes.STRING,
        groupId: DataTypes.STRING
    });
    return UserGroup;
};
