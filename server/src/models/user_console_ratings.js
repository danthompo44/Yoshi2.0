const { Sequelize, DataTypes } = require('sequelize');

/**
 *A function for mapping the api to the user console ratings table in the database.
 * @param {Sequelize} sequelize The sequelize object
 */

function UserConsoleRating(sequelize) {
    return sequelize.define(
        'userConsoleRating',
        {
            user_id: {
                type: DataTypes.INTEGER,
            },
            console_id: {
                type: DataTypes.INTEGER,
            },
            rating: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'user_console_ratings',
        }
    );
}

module.exports = UserConsoleRating;
