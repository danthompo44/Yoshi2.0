const { Sequelize, DataTypes } = require('sequelize');
const ConsolePost = require('./console_post');
const { sequelize } = require('.');

/**
 * A function for mapping consoles to the database
 * @param {Sequelize} sequelize The sequelize object
 * @param {ConsolePost} ConsolePost The console post database mapping
 */
module.exports = (sequelize, ConsolePost) => {
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
    Console.hasMany(ConsolePost, { foreignKey: 'console_id' });
    return Console;
};
