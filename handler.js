const { app } = require('@azure/functions');
const { prototypeMasterController, userController, blobController, authController, prototypeVersionController } = require('./src/controller');
const { util: { ERROR } } = require('./src/helper');
const { addVersion } = require('./src/validators');
const { prototypeVersionRepository } = require('./src/repository');
const prototypeVersionController = require('./src/controller/prototypeVersionController');

app.http('welcome', { route: 'v1/welcome', methods: ['GET'], authLevel: 'anonymous', handler: () => ({ status: ERROR.OK, body: "Welcome Rhibhus Infosystems!!!" }) });

app.http("addPrototypeMaster", { route: 'v1/addPrototypeMaster', methods: ['POST'], authLevel: 'anonymous', handler: prototypeMasterController.addPrototypeMaster });

app.http("addVersion", { route: 'v1/addVersion', methods: ['POST'], authLevel: 'anonymous', handler: prototypeVersionController.addVersion });

app.http('getVersionById', { route: 'v1/getVersionById', methods: ['POST'], authLevel: 'anonymous', handler: prototypeVersionController.getVersionById });

app.http('updateVersionById', { route: 'v1/updateVersionById', methods: ['POST'], authLevel: 'anonymous', handler: prototypeVersionController.updateVersionById });

app.http("fetchPrototypeDetails", { route: 'v1/fetchPrototypeDetails', methods: ['POST'], authLevel: 'anonymous', handler: prototypeMasterController.fetchPrototypeDetails });

app.http("updateVersionDetails", { route: 'v1/updateVersionDetails', methods: ['POST'], authLevel: 'anonymous', handler: prototypeVersionController.updateVersionDetails });

app.http("getVersionById", { route: 'v1/getVersionById', methods: ['POST'], authLevel: 'anonymous', handler: prototypeVersionController.getById });

// app.http("fetchUserById", { route: 'v1/fetchUserById', methods: ['POST'], authLevel: 'anonymous', handler: userController.fetchUserById })

// app.http("userLogin", { route: 'v1/userLogin', methods: ['POST'], authLevel: 'anonymous', handler: userController.userLogin });

// app.http("userRegister", { route: 'v1/userRegister', methods: ['POST'], authLevel: 'anonymous', handler: userController.userRegister });

// app.http("otpForResetPassword", { route: 'v1/otpForResetPassword', methods: ['POST'], authLevel: 'anonymous', handler: userController.otpForResetPassword })

// app.http("resetPassword", { route: 'v1/resetPassword', methods: ['POST'], authLevel: 'anonymous', handler: userController.resetPassword })

// app.http("changePassword", { route: 'v1/changePassword', methods: ['POST'], authLevel: 'anonymous', handler: userController.changePassword })

// app.http("deleteUser", { route: 'v1/deleteUser', methods: ['POST'], authLevel: 'anonymous', handler: userController.update })

// app.http("getSASUrltoPut", { route: 'v1/getSASUrltoPut', methods: ['POST'], authLevel: 'anonymous', handler: blobController.getSASUrltoPut })

// app.http("getSASUrltoAccess", { route: 'v1/getSASUrltoAccess', methods: ['POST'], authLevel: 'anonymous', handler: blobController.getSASUrltoAccess })

// app.http("getSASUrltoAccessPdf", { route: 'v1/getSASUrltoAccessPdf', methods: ['POST'], authLevel: 'anonymous', handler: blobController.getSASUrltoAccessPdf })

// app.http("getSASUrltoPutPdf", { route: 'v1/getSASUrltoPutPdf', methods: ['POST'], authLevel: 'anonymous', handler: blobController.getSASUrltoPutPdf })

// app.http("googleSignInforMobile", { route: 'v1/googleSignInforMobile', methods: ['POST'], authLevel: 'anonymous', handler: authController.googleSignInforMobile });

// app.http("googleSignInforMobileRedirect", { route: 'v1/googleSignInforMobileRedirect', methods: ['GET'], authLevel: 'anonymous', handler: authController.googleSignInforMobileRedirect });

// app.http("googleSignInforWeb", { route: 'v1/googleSignInforWeb', methods: ['POST'], authLevel: 'anonymous', handler: authController.googleSignInforWeb });

// app.http("googleSignInforWebRedirect", { route: 'v1/googleSignInforWebRedirect', methods: ['GET'], authLevel: 'anonymous', handler: authController.googleSignInforWebRedirect });

// app.http("deleteBlobFile", { route: 'v1/deleteBlobFile', methods: ['POST'], authLevel: 'anonymous', handler: blobController.deleteBlobFile })

