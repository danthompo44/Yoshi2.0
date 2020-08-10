const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize The sequelize object
 */
function GamePost(sequelize) {
    return sequelize.define(
        'gamePost',
        {
            title: {
                type: DataTypes.STRING,
            },
            subtitle: {
                type: DataTypes.STRING,
            },
            paragraph_one: {
                type: DataTypes.STRING,
            },
            paragraph_two: {
                type: DataTypes.STRING,
            },
            game_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'game_posts',
        }
    );
}

module.exports = GamePost;
