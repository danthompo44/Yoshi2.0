const { Sequelize, DataTypes } = require('sequelize');

/**
 *A function for mapping the api to the game post comment likes table in the database.
 * @param {Sequelize} sequelize The sequelize object
 */

function GamePostCommentLikes(sequelize) {
    return sequelize.define(
        'gamePostCommentLikes',
        {
            comment_id: {
                type: DataTypes.INTEGER,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'game_post_comment_likes',
        }
    );
}

module.exports = GamePostCommentLikes;
