const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');
const {
    throwAPIError,
    createErrorData,
    isDataNullOrUndefined,
} = require('../helpers');

/**
 * A function to verify a users JWT token.
 * @param {request} req Express request object
 * @param {response} res Express response object
 * @param {next} next Express next function
 */
exports.verifyToken = (req, res, next) => {
    try {
        if (isDataNullOrUndefined(req.headers.authorization)) {
            throwAPIError(401, 'ERR_MISSING_TOKEN', 'Missing token');
        }
        // FORMATTED AS - "BEARER TOKEN.IS.HERE"
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, jwtConfig.secret);
        const userId = decodedToken.userId;
        if (!userId || (req.body.userId && req.body.userId !== userId)) {
            throwAPIError(403, 'ERR_INVALID_TOKEN', 'Invalid token');
        } else {
            next();
        }
    } catch (err) {
        const error = createErrorData(err);
        res.status(error.code).json(error.error);
    }
};
