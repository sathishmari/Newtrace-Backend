const { manufacturingContainer } = require('../containers')
let { baseRepository } = require("./genericRepository");

baseRepository = baseRepository(manufacturingContainer());

const getManufacturingDetailsByVersionId = async (versionId, componentName) => await baseRepository.query(`SELECT * from c WHERE c.versionId = '${versionId}' AND c.componentName = '${componentName}'`);


module.exports = {
  ...baseRepository,

  getManufacturingDetailsByVersionId
}