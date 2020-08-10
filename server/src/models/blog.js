const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize The sequelize object
 */
function Blog(sequelize) {
    return sequelize.define(
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
            content: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'blogs',
        }
    );
}

module.exports = Blog;
