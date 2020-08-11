const { Sequelize, DataTypes } = require('sequelize');

/**
 *
 * @param {Sequelize} sequelize The sequelize object
 */
function Game(sequelize) {
    return sequelize.define(
        'game',
        {
            title: {
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
        },
        {
            timestamps: false,
            freezeTableName: true,
            tableName: 'Games',
        }
    );
}

module.exports = Game;
