const { containers: { CONTAINER_NAMES } } = require('../constants');
const { dbClient } = require('../../cosmosConfig');

const manufacturingContainer = async () => {
    const { container } = await (await dbClient()).containers.createIfNotExists({ id: CONTAINER_NAMES.MANUFACTURING_DETAILS });
    return container;
};

exports.manufacturingContainer = manufacturingContainer;