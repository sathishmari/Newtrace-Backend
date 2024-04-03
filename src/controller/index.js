const authController = require('./authController')
const blobController = require('./blobController')
const commonController = require('./commonController')
const userController = require('./userController')
const prototypeMasterController = require('./prototypeMasterController')
const prototypeVersionController = require('./prototypeVersionController')
const manufacturingController = require('./manufacturingController')

module.exports = {
    authController,
    blobController,
    commonController,
    userController,
    prototypeMasterController,
    prototypeVersionController,
    manufacturingController
}