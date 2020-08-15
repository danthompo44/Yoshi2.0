const { Sequelize, DataTypes } = require('sequelize');

/**
 *A function for mapping the api to the console post comments table in the database.
 * @param {Sequelize} sequelize The sequelize object
 */

function ConsolePostCommentLikes(sequelize) {
    return sequelize.define(
        'consolePostCommentLikes',
        {
            comment_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'console_post_comment_likes',
        }
    );
}

module.exports = ConsolePostCommentLikes;
