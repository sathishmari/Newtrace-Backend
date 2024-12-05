const { containers: { CONTAINER_NAMES } } = require('../../constants');
const { dbClient } = require('../../../cosmosConfig');

const rhibhusTestingContainer = async () => {
    const { container } = await (await dbClient()).containers.createIfNotExists({ id: CONTAINER_NAMES.RHIBHUS_CONTAINER });
    return container;
};

exports.rhibhusTestingContainer = rhibhusTestingContainer;