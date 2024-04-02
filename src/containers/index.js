const userContainer = require('./userContainer')
const prototypeMasterContainer = require('./prototypeMasterContainer');
const prototypeVersionContainer = require('./prototypeVersionContainer');
const ecContainer = require('./ecContainer');


module.exports = {
    ...userContainer,
    ...prototypeMasterContainer,
    ...prototypeVersionContainer,
    ...ecContainer
}