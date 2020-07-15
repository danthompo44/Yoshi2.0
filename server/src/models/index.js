const config = require('../../config/db');
const Game = require('./game');

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    Game: Game(sequelize),
};

module.exports = db;
