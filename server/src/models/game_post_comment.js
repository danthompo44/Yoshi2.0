const { Sequelize, DataTypes } = require('sequelize');
const GamePostCommentLikes = require('./game_post_comment_likes');

/**
 * A function for mapping the api to the game post comments table in the database and create association with game post comment likes
 * @param {Sequelize} sequelize The sequelize object
 * @param {GamePostCommentLikes} GamePostCommentLikes the game post comment likes database mapping
 */
module.exports = (sequelize, GamePostCommentLikes) => {
    const GamePostComment = sequelize.define(
        'gamePostComment',
        {
            comment: {
                type: DataTypes.STRING,
            },
            likes: {
                type: DataTypes.INTEGER,
            },
            game_post_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'game_post_comments',
        }
    );
    GamePostComment.hasMany(GamePostCommentLikes, { foreignKey: 'comment_id' });
    return GamePostComment;
};
