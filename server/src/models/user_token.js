const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize The sequelize object
 */
function UserToken(sequelize) {
    return sequelize.define(
        'userToken',
        {
            token: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            created_at: {
                type: DataTypes.DATE,
            },
            disabled_at: {
                type: DataTypes.DATE,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'user_tokens',
        }
    );
}

module.exports = UserToken;
