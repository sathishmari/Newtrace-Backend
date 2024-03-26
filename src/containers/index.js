const userContainer = require('./userContainer')
const prototypeMasterContainer = require('./prototypeMasterContainer');

module.exports = {
    ...userContainer,
    ...prototypeMasterContainer,
}