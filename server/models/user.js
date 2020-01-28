module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 30],
                isAlphanumeric: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: ['^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$', 'i']
            }
        },
        age: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                max: 130,
                min: 4,
                isNumeric: true
            }
        },
        isDeleted: {
            allowNull: false,
            type: DataTypes.BOOLEAN
        }
    });
    return User;
};
