const { Sequelize, DataTypes } = require('sequelize');
const ConsolePostCommentLikes = require('./console_post_comment_likes');

/**
 * A function for mapping Console post comments to the database whilst creating foreign key relationships with console post comment likes
 * @param {Sequelize} sequelize The sequelize object
 * @param {ConsolePostCommentLikes} ConsolePostCommentLikes the console post comment likes database map object
 */
module.exports = (sequelize, ConsolePostCommentLikes) => {
    const ConsolePostComment = sequelize.define(
        'consolePostComment',
        {
            comment: {
                type: DataTypes.STRING,
            },
            likes: {
                type: DataTypes.INTEGER,
            },
            console_post_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'console_post_comments',
        }
    );
    ConsolePostComment.hasMany(ConsolePostCommentLikes, {
        foreignKey: 'comment_id',
    });
    return ConsolePostComment;
};
