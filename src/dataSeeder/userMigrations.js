const { userRepository } = require('../repository');
const usersData = require('./dataFiles/user.json');

(async () => {
    await userRepository.createMany(usersData);
})();