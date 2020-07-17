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

module.exports = { createErrorData };
