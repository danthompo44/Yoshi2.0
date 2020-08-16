const { request, response } = require('express');

const {
    isDataNullOrUndefined,
    throwNotFoundError,
    createErrorData,
    throwMissingDataError,
} = require('../helpers');
const db = require('../models');

const Query = db.Query;

/**
 * A function to retrieve all queries
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
async function getAll(req, res) {
    try {
        const queries = await Query.findAll();
        if (isDataNullOrUndefined(queries)) {
            throwNotFoundError();
        }
        return res.status(200).json(queries);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * A function to return a query by it's id
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {number} req.params.id A query id
 */
async function getById(req, res) {
    try {
        const query = await Query.findByPk(req.params.id);
        if (isDataNullOrUndefined(query)) {
            throwNotFoundError();
        }
        return res.status(200).json(query);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

/**
 * A function to create a query
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
async function createQuery(req, res) {
    var data = [req.body.email, req.body.name, req.body.message];
    try {
        for (let i = 0; i < data.length; i++) {
            if (isDataNullOrUndefined(data[i])) {
                throwMissingDataError();
            }
        }
        const query = await Query.create({
            message: req.body.message,
            email: req.body.email,
            name: req.body.name,
        });
        return res.status(200).json(query);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

module.exports = { getAll, getById, createQuery };
