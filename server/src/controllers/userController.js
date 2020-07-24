const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    createErrorData,
    isAnyKeyInObjectNullOrUndefined,
    throwMissingDataError,
    throwAPIError,
} = require('../helpers');
const db = require('../models');
const jwtConfig = require('../../config/jwt');

const User = db.User;

/**
 * A function to signup a user.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
exports.signup = async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password,
        };
        if (isAnyKeyInObjectNullOrUndefined(data)) {
            throwMissingDataError();
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            email: req.body.email,
            password: hashedPassword,
        });
        const token = generateToken(user.id);
        res.status(201).json({ id: user.id, token: token });
    } catch (err) {
        const error = createErrorData(err);
        res.status(error.code).json(error.error);
    }
};

/**
 * A function to login a user.
 * @param {request} req Express request object
 * @param {response} res Express response object
 */
exports.login = async (req, res) => {
    try {
        const data = {
            email: req.body.email,
            password: req.body.password,
        };
        if (isAnyKeyInObjectNullOrUndefined(data)) {
            throwMissingDataError();
        }

        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            throwAPIError(404, 'ERR_USER_NOT_FOUND', 'User not found');
        }

        const isValidPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isValidPassword) {
            throwAPIError(401, 'ERR_BAD_DATA', 'Incorrect email or password');
        }

        const token = generateToken(user.id);

        return res.status(200).json({ id: user.id, token: token });
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
};

/**
 * Function to generate a JWT token.
 * @param {number} userId The users id
 * @returns {string} The JWT token
 */
function generateToken(userId) {
    const token = jwt.sign({ id: userId }, jwtConfig.secret, {
        expiresIn: '24h',
    });
    return token;
}
