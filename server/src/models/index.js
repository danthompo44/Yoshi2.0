const { Sequelize } = require('sequelize');

const winston = require('../../config/winston');
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
const ConsolePostCommentLikes = require('./console_post_comment_likes');
const GamePostCommentLikes = require('./game_post_comment_likes');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
});

sequelize
    .authenticate()
    .then(() => {
        winston.log('Connection has been established successfully.');
    })
    .catch((err) => {
        winston.error('Unable to connect to the database: ' + err);
    });

//level 1 mappings that have no dependencies on other models
const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    BlogCommentLikes: BlogCommentLikes(sequelize),
    ConsolePostCommentLikes: ConsolePostCommentLikes(sequelize),
    GamePostCommentLikes: GamePostCommentLikes(sequelize),
    UserToken: UserToken(sequelize),
    Query: Query(sequelize),
};

//create level 2 mappings that have dependencies on level 1 mappings
db.ConsolePostComment = ConsolePostComment(
    sequelize,
    db.ConsolePostCommentLikes
);
db.GamePostComment = GamePostComment(sequelize, db.GamePostCommentLikes);
db.BlogComment = BlogComment(sequelize, db.BlogCommentLikes);
db.User = User(sequelize, db.BlogCommentLikes);

//create level 3 mappings
db.ConsolePost = ConsolePost(sequelize, db.ConsolePostComment);
db.Blog = Blog(sequelize, db.BlogComment);
db.GamePost = GamePost(sequelize, db.GamePostComment);

//create level 4 mappings
db.Console = Console(sequelize, db.ConsolePost);
db.Game = Game(sequelize, db.GamePost);

module.exports = db;
