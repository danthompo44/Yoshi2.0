const validHelpers = require('./validHelpers');
const errorHelpers = require('./errorHelpers');
const productHelpers = require('./productHelpers');

module.exports = Object.assign(
    {
        validHelpers,
        errorHelpers,
        productHelpers,
    },
    validHelpers,
    errorHelpers,
    productHelpers
);
