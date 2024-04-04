const { app } = require('@azure/functions');
const { prototypeMasterController, userController, blobController, authController, prototypeVersionController, manufacturingController } = require('./src/controller');
const { util: { ERROR } } = require('./src/helper');
const ecController = require('./src/controller/ecController');
const experimentController = require('./src/controller/experimentController');

app.http('welcome', { route: 'v1/welcome', methods: ['GET'], authLevel: 'anonymous', handler: () => ({ status: ERROR.OK, body: "Welcome Rhibhus Infosystems!!!" }) });

app.http("addPrototypeMaster", { route: 'v1/addPrototypeMaster', methods: ['POST'], authLevel: 'anonymous', handler: prototypeMasterController.addPrototypeMaster });

app.http("addExperiment", { route: 'v1/addExperiment', methods: ['POST'], authLevel: 'anonymous', handler: experimentController.addExperiment });

app.http("updatePrototypeDetails", { route: 'v1/updatePrototypeDetails', methods: ['POST'], authLevel: 'anonymous', handler: prototypeMasterController.updatePrototypeDetails });

app.http("addVersion", { route: 'v1/addVersion', methods: ['POST'], authLevel: 'anonymous', handler: prototypeVersionController.addVersion});

app.http('getVersionById', { route: 'v1/getVersionById', methods: ['POST'], authLevel: 'anonymous', handler: prototypeVersionController.getVersionById  });

app.http('updateVersionById', { route: 'v1/updateVersionById', methods: ['POST'], authLevel: 'anonymous', handler: prototypeVersionController.updateVersionById  });

app.http("fetchPrototypeDetails", { route: 'v1/fetchPrototypeDetails', methods: ['POST'], authLevel: 'anonymous', handler: prototypeMasterController.fetchPrototypeDetails });

app.http("addEcDetails", { route: 'v1/addEcDetails', methods: ['POST'], authLevel: 'anonymous', handler: ecController.addEcDetails });

app.http("fetchEcDetails", { route: 'v1/fetchEcDetails', methods: ['POST'], authLevel: 'anonymous', handler: ecController.fetchEcDetails });

app.http("fetchManufacturingDetailsByVersionId", { route: 'v1/fetchManufacturingDetailsByVersionId', methods: ['POST'], authLevel: 'anonymous', handler: manufacturingController.fetchManufacturingDetailsByVersionId });

app.http("addManufacturingDetails", { route: 'v1/addManufacturingDetails', methods: ['POST'], authLevel: 'anonymous', handler: manufacturingController.addManufacturingDetails });

app.http("updateManufacturingDetails", { route: 'v1/updateManufacturingDetails', methods: ['POST'], authLevel: 'anonymous', handler: manufacturingController.updateManufacturingDetails });

app.http("fetchComponentDetailById", { route: 'v1/fetchComponentDetailById', methods: ['POST'], authLevel: 'anonymous', handler: manufacturingController.fetchComponentDetailById });