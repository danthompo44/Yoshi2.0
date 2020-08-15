const { Sequelize } = require('sequelize');

const config = require('../../config/db');

// model imports
const Game = require('./game');
const Console = require('./console');
const Blog = require('./blog');
const User = require('./user');
const UserToken = require('./user_token');
const GamePostComment = require('./game_post_comment');
const ConsolePost = require('./console_post');
const GamePost = require('./game_post');
const ConsolePostComment = require('./console_post_comment');
const BlogComment = require('./blog_comment');
const Query = require('./query');
const BlogCommentLikes = require('./blog_comment_likes');

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
    BlogCommentLikes: BlogCommentLikes(sequelize),
    UserToken: UserToken(sequelize),
    Query: Query(sequelize),
};

db.BlogComment = BlogComment(sequelize, db.BlogCommentLikes);
db.Blog = Blog(sequelize, db.BlogComment);
db.User = User(sequelize, db.BlogCommentLikes);

module.exports = db;
