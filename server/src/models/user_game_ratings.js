const { Sequelize, DataTypes } = require('sequelize');

/**
 *A function for mapping the api to the user game ratings table in the database.
 * @param {Sequelize} sequelize The sequelize object
 */

function UserGameRating(sequelize) {
    return sequelize.define(
        'userGameRating',
        {
            user_id: {
                type: DataTypes.INTEGER,
            },
            game_id: {
                type: DataTypes.INTEGER,
            },
            rating: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'user_game_ratings',
        }
    );
}

module.exports = UserGameRating;
