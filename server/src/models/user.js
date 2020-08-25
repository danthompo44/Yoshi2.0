const { Sequelize, DataTypes } = require('sequelize');
const BlogCommentLikes = require('./blog_comment_likes');
const UserConsoleRating = require('./user_console_ratings');
const UserGameRating = require('./user_game_ratings');

/**
 *A function that models Users to the database, also creates foreign key relationship with BlogCommentLikes
 * @param {Sequelize} sequelize The sequelize object
 * @param {BlogCommentLikes} BlogCommentLikes The Blog Comment Likes Database model.
 * @param {UserConsoleRating} UserConsoleRating The user console rating Database model.
 * @param {UserGameRating} UserGameRating The user game rating Database model.
 */
module.exports = (
    sequelize,
    BlogCommentLikes,
    UserConsoleRating,
    UserGameRating
) => {
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

    //create associations and foreign keys
    User.hasMany(BlogCommentLikes, { foreignKey: 'user_id' });
    User.hasMany(UserConsoleRating, { foreignKey: 'user_id' });
    User.hasMany(UserGameRating, { foreignKey: 'user_id' });

    return User;
};
