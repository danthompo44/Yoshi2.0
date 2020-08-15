const { Sequelize, DataTypes } = require('sequelize');

/**
 *A function for mapping the api to the blog comments likes table in the database.
 * @param {Sequelize} sequelize The sequelize object
 */

function BlogCommentLikes(sequelize) {
    return sequelize.define(
        'blogCommentLikes',
        {},
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'blog_comments_likes',
        }
    );
}

module.exports = BlogCommentLikes;
