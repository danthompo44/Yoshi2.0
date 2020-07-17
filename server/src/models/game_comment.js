const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize The sequelize object
 */
function GameComment(sequelize) {
    return sequelize.define(
        'gameComment',
        {
            comment: {
                type: DataTypes.STRING,
            },
            likes: {
                type: DataTypes.INTEGER,
            },
            game_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'game_comments',
        }
    );
}

module.exports = GameComment;
