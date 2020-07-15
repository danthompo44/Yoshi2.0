const db = require('../models');

const Game = db.Game;

async function getAll(req, res) {
    const games = await Game.findAll();
    res.status(200).json(games);
}

module.exports = { getAll };
