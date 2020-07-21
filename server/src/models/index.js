const { Sequelize } = require('sequelize');

const config = require('../../config/db');

// model imports
const Game = require('./game');
const Console = require('./console');
const Blog = require('./blog');
const User = require('./user');
const GamePostComment = require('./game_post_comment');
const ConsolePost = require('./console_post');
const GamePost = require('./game_post');
const ConsolePostComment = require('./console_post_comment');
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
    GamePost: GamePost(sequelize),
    GamePostComment: GamePostComment(sequelize),
    Console: Console(sequelize),
    ConsolePost: ConsolePost(sequelize),
    ConsolePostComment: ConsolePostComment(sequelize),
    Blog: Blog(sequelize),
    BlogComment: BlogComment(sequelize),
    User: User(sequelize),
    Query: Query(sequelize),
};

module.exports = db;
