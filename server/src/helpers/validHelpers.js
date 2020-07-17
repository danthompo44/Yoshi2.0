/**
 * A function to determine if any value in an object is null or undefined.
 * @param {{what: any, ever: any, you: any, like: any}} data Any object
 * @returns True if any key is null or undefined
 */
function isAnyKeyInObjectNullOrUndefined(data) {
    if (!data || typeof data === undefined) {
        return true;
    }
    if (typeof data !== 'object') {
        return true;
    }

    for (const key in data) {
        if (data[key] === null || data[key] === undefined) {
            return true;
        }
    }
    return false;
}

/**
 * A function to determine if a value is null or undefined.
 * @param {any} data Any data
 * @returns True if data is null or undefined
 */
function isDataNullOrUndefined(data) {
    if (!data || typeof data === undefined) {
        return true;
    }

    return false;
}

module.exports = { isAnyKeyInObjectNullOrUndefined, isDataNullOrUndefined };
