const { request, response } = require('express');
const { Op } = require('sequelize');

const { createErrorData } = require('../helpers');
const db = require('../models');

const Console = db.Console;
const Game = db.Game;

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
        });

        const games = await Game.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.query.search}%`,
                },
            },
        });

        return res.status(200).json({ consoles, games });
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

module.exports = {
    searchForProducts,
};
