const { Sequelize, DataTypes } = require('sequelize');
const ConsolePostComments = require('./console_post_comment');

/**
 *A function for maping console posts to the dtabase and creatinga  relation ship with console post comments
 * @param {Sequelize} sequelize The sequelize object
 * @param {ConsolePostComments} ConsolePostComments the console post comments database map
 */
module.exports = (sequelize, ConsolePostComments) => {
    const ConsolePost = sequelize.define(
        'consolePost',
        {
            title: {
                type: DataTypes.STRING,
            },
            subtitle: {
                type: DataTypes.STRING,
            },
            paragraph_one: {
                type: DataTypes.STRING,
            },
            paragraph_two: {
                type: DataTypes.STRING,
            },
            console_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'console_posts',
        }
    );
    ConsolePost.hasMany(ConsolePostComments, { foreignKey: 'console_post_id' });
    return ConsolePost;
};
