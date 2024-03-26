const userContainer = require('./userContainer')
const prototypeMasterContainer = require('./prototypeMasterContainer');
const prototypeVersionContainer = require('./prototypeVersionContainer');

module.exports = {
    ...userContainer,
    ...prototypeMasterContainer,
    ...prototypeVersionContainer
}