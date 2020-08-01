const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const randToken = require('rand-token');

const {
    createErrorData,
    isAnyKeyInObjectNullOrUndefined,
    throwMissingDataError,
    throwAPIError,
} = require('../helpers');
const db = require('../models');
const jwtConfig = require('../../config/jwt');

const User = db.User;
const UserToken = db.UserToken;

/**
 * A function to signup a user.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
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
        const refreshToken = await generateRefreshToken(user.id);

        res.cookie('token', refreshToken, { httpOnly: true });
        res.status(201).json({ id: user.id, token: token });
    } catch (err) {
        const error = createErrorData(err);
        res.status(error.code).json(error.error);
    }
};

/**
 * A function to login a user.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
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
        const refreshToken = await generateRefreshToken(user.id);

        res.cookie('token', refreshToken, { httpOnly: true });
        return res.status(200).json({ id: user.id, token: token });
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
};

/**
 * A function to refresh a JWT token.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
exports.refreshToken = async (req, res) => {
    try {
        const data = {
            userId: req.body.userId,
            token: req.cookies.token,
        };
        if (isAnyKeyInObjectNullOrUndefined(data)) {
            throwMissingDataError();
        }

        const tokenValid = await UserToken.findOne({
            where: { token: data.token, user_id: data.userId },
        });

        if (!tokenValid) {
            throwAPIError(404, 'ERR_TOKEN_NOT_FOUND', 'Token not found');
        }

        const newToken = generateToken(data.userId);
        return res.status(200).json({ token: newToken });
    } catch (err) {
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
};

/**
 * A function to remove a refreshToken from a user.
 * @param {request} req Express request object.
 * @param {response} res Express response object.
 */
exports.logout = async (req, res) => {
    try {
        console.log(req.cookies);
        console.log(req.body.userId);
        const data = {
            userId: req.body.userId,
            token: req.cookies.token,
        };
        if (isAnyKeyInObjectNullOrUndefined(data)) {
            throwMissingDataError();
        }

        await UserToken.destroy({
            where: { token: data.token, user_id: data.userId },
        });

        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out' });
    } catch (err) {
        console.log(err);
        const error = createErrorData(err);
        return res.status(error.code).json(error.error);
    }
};

/**
 * Function to generate a JWT token.
 * @param {number} userId The users id.
 * @returns {string} The JWT token.
 */
function generateToken(userId) {
    const token = jwt.sign({ userId }, jwtConfig.secret, {
        expiresIn: '24h',
    });
    return token;
}

/**
 * Function to generate a random secure token.
 * Will save the token in the DB against the user.
 * @param {number} userId The users id.
 * @returns {Promise<string>} The random token 16 characters in length.
 */
async function generateRefreshToken(userId) {
    try {
        const token = randToken.generate(16);
        const currentDate = new Date();
        const disabledDate = new Date(
            currentDate.setMonth(currentDate.getMonth + 1)
        ).toUTCString();
        await UserToken.create({
            token: token,
            created_at: Date.now(),
            disabled_at: Date.now(),
            user_id: userId,
        });
        return token;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
