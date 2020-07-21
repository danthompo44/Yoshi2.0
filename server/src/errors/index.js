/**
 * The base error to call for the API.
 * @param {number} [code=400] The HTTP status code of the error
 * @param {string} [name="UNKNOWN_ERROR"] The name of the error. Done in format ALL_CAPS_WITH_UNDERSCORE
 * @param {string} [message="An unknown error occured"] The user-friendly text of the error
 * @returns {{code: number, name: string, message: string}} Error object to return to client
 */
function APIError(code, name, message) {
    return {
        code: code || 400,
        name: name || 'UNKNOWN_ERROR',
        message: message || 'An unknown error occured',
    };
}

module.exports = { APIError };
