const { Sequelize, DataTypes, HasMany } = require('sequelize');
const BlogCommentLikes = require('./blog_comment_likes');

/**
 *A mehotd for mapping Blog Comments to the database
 * @param {Sequelize} sequelize The sequelize object
 * @param {BlogCommentLikes} BlogCommentLikes the Blog Comment likes database model
 */
module.exports = (sequelize, BlogCommentLikes) => {
    const BlogComment = sequelize.define(
        'blogComment',
        {
            comment: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'blog_comments',
        }
    );
    BlogComment.hasMany(BlogCommentLikes, { foreignKey: 'comment_id' });
    return BlogComment;
};
