const { manufacturingContainer } = require('../containers')
let { baseRepository } = require("./genericRepository");

baseRepository = baseRepository(manufacturingContainer());


module.exports = {
  ...baseRepository,


}