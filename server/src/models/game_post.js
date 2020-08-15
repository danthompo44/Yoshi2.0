const { Sequelize, DataTypes } = require('sequelize');
const GamePostComment = require('./game_post_comment');

/**
 * A function for mapping the api to the game posts table in the database and create association with game post comments
 * @param {Sequelize} sequelize The sequelize object
 * @param {GamePostComment} GamePostComment the game post comment database mapping
 */
module.exports = (sequelize, GamePostComment) => {
    const GamePost = sequelize.define(
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
    GamePost.hasMany(GamePostComment, { foreignKey: 'game_post_id' });
    return GamePost;
};
