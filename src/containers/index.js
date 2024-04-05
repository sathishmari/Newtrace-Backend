const userContainer = require('./userContainer')
const prototypeMasterContainer = require('./prototypeMasterContainer');
const prototypeVersionContainer = require('./prototypeVersionContainer');
const ecContainer = require('./ecContainer');
const manufacturingContainer = require('./manufacturingContainer');
const experimentContainer = require('./experimentContainer');


module.exports = {
    ...userContainer,
    ...prototypeMasterContainer,
    ...prototypeVersionContainer,
    ...ecContainer,
    ...manufacturingContainer,
    ...experimentContainer,
}