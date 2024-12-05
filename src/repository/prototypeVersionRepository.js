const { prototypeVersionContainer } = require('../containers')
let { baseRepository } = require("./genericRepository");

baseRepository = baseRepository(prototypeVersionContainer());

const getByVersionName = async (versionName, prototypeId) => await baseRepository.query(`select * from c where c.versionName = '${versionName}' AND c.prototypeId = '${prototypeId}'`);
module.exports = {
  ...baseRepository,

  getByVersionName
}