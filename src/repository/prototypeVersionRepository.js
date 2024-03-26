const { prototypeVersionContainer } = require('../containers')
let { baseRepository } = require("./genericRepository");

baseRepository = baseRepository(prototypeVersionContainer());

module.exports = {
  ...baseRepository
}