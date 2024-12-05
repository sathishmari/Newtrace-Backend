const { containers: { CONTAINER_NAMES } } = require('../constants');
const { dbClient } = require('../../cosmosConfig');

const prototypeMasterContainer = async () => {
    const { container } = await (await dbClient()).containers.createIfNotExists({ id: CONTAINER_NAMES.PROTOTYPE_MASTER });
    return container;
};

exports.prototypeMasterContainer = prototypeMasterContainer;