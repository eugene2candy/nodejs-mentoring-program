module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            unique: true,
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 30],
                isAlphanumeric: true
            }
        },
        permission: {
            type: DataTypes.ARRAY(DataTypes.ENUM),
            values: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'],
            allowNull: false
        }
    });
    Group.associate = models => {
        Group.belongsToMany(models.User, {
            through: 'UserGroups',
            as: 'users',
            foreignKey: 'groupId'
        });
    };
    return Group;
};
