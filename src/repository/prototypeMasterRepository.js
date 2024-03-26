const { prototypeMasterContainer } = require('../containers')
let { baseRepository } = require("./genericRepository");
const { util: { makeLcWithoutSpace } } = require('../helper');

baseRepository = baseRepository(prototypeMasterContainer());

const getByLcPrototypeName = async (lcName) => await baseRepository.query(`SELECT * from c WHERE c.lcPrototypeName = '${await makeLcWithoutSpace(lcName)}'`);

module.exports = {
  ...baseRepository, 

  getByLcPrototypeName
}