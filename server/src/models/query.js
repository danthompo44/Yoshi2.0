const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize The sequelize object
 */
function Query(sequelize) {
    return sequelize.define(
        'query',
        {
            message: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
            },
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'queries',
        }
    );
}

module.exports = Query;
