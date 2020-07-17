const validHelpers = require('./validHelpers');
const errorHelpers = require('./errorHelpers');

module.exports = Object.assign(
    {
        validHelpers,
        errorHelpers,
    },
    validHelpers,
    errorHelpers
);
