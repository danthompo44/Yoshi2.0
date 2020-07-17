const { Sequelize } = require('sequelize');

const config = require('../../config/db');

// model imports
const Game = require('./game');
const Console = require('./console');
const Blog = require('./blog');
const User = require('./user');
const GameComment = require('./game_comment');
const ConsoleComment = require('./console_comment');
const BlogComment = require('./blog_comment');
const Query = require('./query');

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
    GameComment: GameComment(sequelize),
    Console: Console(sequelize),
    ConsoleComment: ConsoleComment(sequelize),
    Blog: Blog(sequelize),
    BlogComment: BlogComment(sequelize),
    User: User(sequelize),
    Query: Query(sequelize),
};

module.exports = db;
