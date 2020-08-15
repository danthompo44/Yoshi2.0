const { Sequelize, DataTypes } = require('sequelize');
const BlogComment = require('./blog_comment');

/**
 * A function to model blog entries to the database
 * @param {Sequelize} sequelize The sequelize object
 * @param {BlogComment} BlogComment THe Blog Comment database model
 */
module.exports = (sequelize, BlogComment) => {
    const Blog = sequelize.define(
        'blog',
        {
            title: {
                type: DataTypes.STRING,
            },
            subtitle: {
                type: DataTypes.STRING,
            },
            img_src: {
                type: DataTypes.STRING,
            },
            img_alt: {
                type: DataTypes.STRING,
            },
            paragraph_one: {
                type: DataTypes.STRING,
            },
            paragraph_two: {
                type: DataTypes.STRING,
            },
            vid_src: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'blogs',
        }
    );
    Blog.hasMany(BlogComment, { foreignKey: 'blog_id' });
    return Blog;
};
