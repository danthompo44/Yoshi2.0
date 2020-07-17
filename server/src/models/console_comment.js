const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize The sequelize object
 */
function ConsoleComment(sequelize) {
    return sequelize.define(
        'consoleComment',
        {
            comment: {
                type: DataTypes.STRING,
            },
            likes: {
                type: DataTypes.INTEGER,
            },
            console_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'console_comments',
        }
    );
}

module.exports = ConsoleComment;
