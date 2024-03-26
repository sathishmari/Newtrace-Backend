const { containers: { CONTAINER_NAMES } } = require('../constants');
const { dbClient } = require('../../cosmosConfig');

const prototypeVersionContainer = async () => {
    const { container } = await (await dbClient()).containers.createIfNotExists({ id: CONTAINER_NAMES.PROTOTYPE_VERSION });
    return container;
};

exports.prototypeVersionContainer = prototypeVersionContainer;