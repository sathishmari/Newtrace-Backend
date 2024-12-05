const { prototypeMasterContainer, ecContainer } = require('../containers')
let { baseRepository } = require("./genericRepository");

baseRepository = baseRepository(ecContainer());

module.exports = {
  ...baseRepository,
}