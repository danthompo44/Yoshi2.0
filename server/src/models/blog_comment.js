const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize The sequelize object
 */
function BlogComment(sequelize) {
    return sequelize.define(
        'blogComment',
        {
            comment: {
                type: DataTypes.STRING,
            },
            likes: {
                type: DataTypes.INTEGER,
            },
            blog_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'blog_comments',
        }
    );
}

module.exports = BlogComment;
