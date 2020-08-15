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
 * @param {next} next Express next middleware
 */
exports.verifyToken = (req, res, next) => {
    console.log(req.headers.authorization);
    try {
        if (isDataNullOrUndefined(req.headers.authorization)) {
            throwAPIError(401, 'ERR_MISSING_TOKEN', 'Missing token');
        }
        // FORMATTED AS - "BEARER TOKEN.IS.HERE"
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, jwtConfig.secret);
        const userId = decodedToken.userId;
        console.log(userId);
        console.log(req.body.userId);
        if (!userId || (req.body.userId && req.body.userId !== userId)) {
            console.log('In the if');
            throwAPIError(403, 'ERR_INVALID_TOKEN', 'Invalid token');
        } else {
            next();
        }
    } catch (err) {
        // console.log(err);
        const error = createErrorData(err);
        res.status(error.code).json(error.error);
    }
};
