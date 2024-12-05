const { experimentContainer } = require('../containers')
let { baseRepository } = require("./genericRepository");

baseRepository = baseRepository(experimentContainer());

module.exports = {
  ...baseRepository,

}