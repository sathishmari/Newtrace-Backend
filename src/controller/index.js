const authController = require('./authController')
const blobController = require('./blobController')
const commonController = require('./commonController')
const userController = require('./userController')
const prototypeMasterController = require('./prototypeMasterController')
const prototypeVersionController = require('./prototypeVersionController')

module.exports = {
    authController, 
    blobController, 
    commonController,
    userController,
    prototypeMasterController,
    prototypeVersionController
}