const { Sequelize, DataTypes } = require('sequelize');
const ConsolePost = require('./console_post');
const UserConsoleRatings = require('./user_console_ratings');

/**
 * A function for mapping consoles to the database
 * @param {Sequelize} sequelize The sequelize object
 * @param {ConsolePost} ConsolePost The console post database mapping
 * @param {UserConsoleRatings} UserConsoleRatings The user console ratings database mapping
 */
module.exports = (sequelize, ConsolePost, UserConsoleRatings) => {
    const Console = sequelize.define(
        'console',
        {
            name: {
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
            form_factor: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'consoles',
        }
    );
    //create foreign keys and associations
    Console.hasMany(ConsolePost, { foreignKey: 'console_id' });
    Console.hasMany(UserConsoleRatings, { foreignKey: 'console_id' });

    return Console;
};
