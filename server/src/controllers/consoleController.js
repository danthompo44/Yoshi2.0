const { createErrorData } = require('../helpers');
const db = require('../models');

const Console = db.Console;

async function getAll(req, res) {
    try {
        const consoles = await Console.findAll();
        return res.status(200).json(consoles);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

module.exports = { getAll };
