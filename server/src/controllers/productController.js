const { request, response } = require('express');
const { Op } = require('sequelize');

const {
    createErrorData,
    createConsoleObjectWithAverageRating,
    createGameObjectWithAverageRating,
} = require('../helpers');
const db = require('../models');

const Console = db.Console;
const Game = db.Game;
const UserGameRating = db.UserGameRating;
const UserConsoleRating = db.UserConsoleRating;

/**
 * A method to search for consoles and games from one endpoint.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
async function searchForProducts(req, res) {
    try {
        const consoles = await Console.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.query.search}%`,
                },
            },
            include: {
                model: UserConsoleRating,
                attributes: ['rating'],
            },
        });
        let consolesWithAverageRating = [];
        for (let i = 0; i < consoles.length; i++) {
            consolesWithAverageRating.push(
                createGameObjectWithAverageRating(consoles[i])
            );
        }

        const games = await Game.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.query.search}%`,
                },
            },
            include: {
                model: UserGameRating,
                attributes: ['rating'],
            },
        });
        let gamesWithAverageRating = [];
        for (let i = 0; i < games.length; i++) {
            gamesWithAverageRating.push(
                createGameObjectWithAverageRating(games[i])
            );
        }

        return res
            .status(200)
            .json({ consolesWithAverageRating, gamesWithAverageRating });
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

module.exports = {
    searchForProducts,
};
