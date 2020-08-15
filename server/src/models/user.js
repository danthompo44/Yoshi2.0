const { Sequelize, DataTypes } = require('sequelize');
const BlogCommentLikes = require('./blog_comment_likes');

/**
 *A function that models Users to the database, also creates foreign key relationship with BlogCommentLikes
 * @param {Sequelize} sequelize The sequelize object
 * @param {BlogCommentLikes} BlogCommentLikes The Blog Comment Likes Database model.
 */
module.exports = (sequelize, BlogCommentLikes) => {
    const User = sequelize.define(
        'user',
        {
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'users',
        }
    );
    User.hasMany(BlogCommentLikes, { foreignKey: 'user_id' });
    return User;
};
