const { containers: { CONTAINER_NAMES } } = require('../constants');
const { dbClient } = require('../../cosmosConfig');

const ecContainer = async () => {
    const { container } = await (await dbClient()).containers.createIfNotExists({ id: CONTAINER_NAMES.EC_DETAILS });
    return container;
};

exports.ecContainer = ecContainer;