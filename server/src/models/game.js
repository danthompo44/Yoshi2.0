const { Sequelize, DataTypes } = require('sequelize');
const GamePost = require('./game_post');
const UserGameRating = require('./user_game_ratings');

/**
 * A function for mapping Game data to the database, also creates associations
 * @param {Sequelize} sequelize The sequelize object
 * @param {GamePost} GamePost the game post sequelize database model
 * @param {UserGameRating} UserGameRating the user game rating sequelize database model
 */
module.exports = (sequelize, GamePost, UserGameRating) => {
    const Game = sequelize.define(
        'game',
        {
            title: {
                type: DataTypes.STRING,
            },
            image_url: {
                type: DataTypes.STRING,
            },
            image_alt: {
                type: DataTypes.STRING,
            },
            video_src: {
                type: DataTypes.STRING,
            },
            multiplayer: {
                type: DataTypes.BOOLEAN,
            },
            online: {
                type: DataTypes.BOOLEAN,
            },
            cost: {
                type: DataTypes.DOUBLE,
            },
            trending: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'Games',
        }
    );
    //create foreign keys and associations
    Game.hasMany(GamePost, { foreignKey: 'game_id' });
    Game.hasMany(UserGameRating, { foreignKey: 'game_id' });

    return Game;
};
