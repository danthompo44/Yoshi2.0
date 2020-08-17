const { Sequelize, DataTypes } = require('sequelize');
const GamePost = require('./game_post');

/**
 * A function for mapping Game data to the database, also creates association with Game Posts
 * @param {Sequelize} sequelize The sequelize object
 * @param {GamePost} GamePost the game post sequelize database model
 */
module.exports = (sequelize, GamePost) => {
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
            rating: {
                type: DataTypes.INTEGER,
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
    Game.hasMany(GamePost, { foreignKey: 'game_id' });
    return Game;
};
