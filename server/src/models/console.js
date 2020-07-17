const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize The sequelize object
 */
function Console(sequelize) {
    return sequelize.define(
        'console',
        {
            name: {
                type: DataTypes.STRING,
            },
            rating: {
                type: DataTypes.INTEGER,
            },
            multiplayer: {
                type: DataTypes.BOOLEAN,
            },
            online: {
                type: DataTypes.BOOLEAN,
            },
            cost: {
                type: DataTypes.DOUBLE,
            },
            trending: {
                type: DataTypes.BOOLEAN,
            },
            form_factor: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'consoles',
        }
    );
}

module.exports = Console;
