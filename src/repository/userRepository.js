const { userContainer } = require('../containers')
let { baseRepository } = require("./genericRepository");

baseRepository = baseRepository(userContainer());

const getByEmail = async (email) => await baseRepository.query(`SELECT * from c WHERE c.email = '${email.toLowerCase()}' `);

module.exports = {
  ...baseRepository, 

  getByEmail
}