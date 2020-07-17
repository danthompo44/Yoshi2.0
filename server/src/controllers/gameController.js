const { createErrorData } = require('../helpers');
const db = require('../models');

const Game = db.Game;

async function getAll(req, res) {
    try {
        const games = await Game.findAll();
        return res.status(200).json(games);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

module.exports = { getAll };
