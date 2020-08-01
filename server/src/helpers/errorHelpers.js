const { APIError } = require('../errors');

/**
 * Create error data for a response back from the API. Will either return the data if valid, or create a generic code and message to send back.
 * @param {Error | {code?: number, name?: string, message?: string}} error An optional error
 * @returns An object with a HTTP status code, a name and a message
 */
function createErrorData(error) {
    // create generic error message that can be overridden if the data is appropriate
    let data = {
        code: 400,
        error: {
            name: 'An error occured',
            message: 'An unexpected error occured',
        },
    };

    // if an error got passed through
    // potentially override data to return
    if (error) {
        if (error.code && typeof error.code === 'number') {
            data.code = error.code;
        }

        if (error.name && typeof error.name === 'string') {
            data.error.name = error.name;
        }

        if (error.message && typeof error.message === 'string') {
            data.error.message = error.message;
        }
    }

    return data;
}

/**
 * Function that throws an API error.
 * Default code is 400.
 * Default name is "UNKNOWN_ERROR".
 * Default message is "Request Failed"
 * @param {number} [code=400] The code of the error - Default 400
 * @param {string} [name="UNKNOWN_ERROR"] The name of the error - Default "UNKNOWN_ERROR"
 * @param {string} [message="Request failed"] The user friendly message of the error - Default "Request failed"
 */
function throwAPIError(code, name, message) {
    throw APIError(
        code || 400,
        name || 'UKNOWN_ERROR',
        message || 'Request failed'
    );
}

/**
 * Function that throws an API error containing the relevant information for a request with missing data.
 * Default code is 400.
 * @param {number} [code=400] The code of the error - Default 400
 * @param {string} [name="ERR_MISSING_DATA"] The name of the error
 * @param {string} [message="Missing data to complete task"] The user friendly message of the error
 */
function throwMissingDataError(code, name, message) {
    throw APIError(
        code || 400,
        name || 'ERR_MISSING_DATA',
        message || 'Missing data to complete task'
    );
}

module.exports = {
    createErrorData,
    throwAPIError,
    throwMissingDataError,
};
