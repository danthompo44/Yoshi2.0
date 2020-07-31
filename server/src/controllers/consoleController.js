const { request, response } = require('express');

const { createErrorData, isDataNullOrUndefined, throwNotFoundError } = require('../helpers');
const db = require('../models');

const Console = db.Console;

/**
 * A method to retrieve all consoles
 * @param {request} req Express Request Object
 * @param {response} res Express Response Object
 */
async function getAll(req, res) {
    try {
        const consoles = await Console.findAll();
        return res.status(200).json(consoles);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * A method to retrieve a console by its id
 * @param {request} req Express Request Object
 * @param {response} res Express Response Object
 * @param {number} req.params.id A console id
 */
async function getById(req, res){
    try{
        const console = await Console.findByPk(req.params.id);
        if(isDataNullOrUndefined(console)){
            throwNotFoundError();
        }
        return res.status(200).json(console);
    }
    catch(err){
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

module.exports = { getAll, getById };
