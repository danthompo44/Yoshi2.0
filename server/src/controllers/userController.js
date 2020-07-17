const {
    createErrorData,
    isAnyKeyInObjectNullOrUndefined,
} = require('../helpers');
const db = require('../models');

const User = db.User;

async function login(req, res) {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password,
        };

        if (isAnyKeyInObjectNullOrUndefined(data)) {
            throw {
                code: 400,
                name: 'Missing data error',
                message: 'Missing data',
            };
        }

        return res.status(200).json(data);
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
}

module.exports = { login };
