const { containers: { CONTAINER_NAMES } } = require('../constants');
const { dbClient } = require('../../cosmosConfig');

const userContainer = async () => {
    // const { container } = await (await dbClient()).containers.createIfNotExists({ id: CONTAINER_NAMES.USER });
    // return container;
    return;
};

exports.userContainer = userContainer;