const blobService = require('./blobService')
const emailService = require('./emailService')
const userService = require('./userService')
const prototypeMasterService = require('./prototypeMasterService')
const prototypeVersionService = require('./prototypeVersionService');
const ecService = require('./ecService');
const manufacturingService = require('./manufacturingService');
const experimentService = require('./experimentService');


module.exports = {
    blobService,
    emailService,
    userService,
    prototypeMasterService,
    prototypeVersionService,
    ecService,
    manufacturingService,
    experimentService
}