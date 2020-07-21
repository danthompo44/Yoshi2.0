const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize The sequelize object
 */
function ConsolePost(sequelize) {
    return sequelize.define(
        'consolePost',
        {
            title: {
                type: DataTypes.STRING,
            },
            subtitle: {
                type: DataTypes.STRING,
            },
            content: {
                type: DataTypes.STRING,
            },
            console_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'console_posts',
        }
    );
}

module.exports = ConsolePost;
