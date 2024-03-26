const dotenv = require("dotenv");
dotenv.config();

let DBEnvPrefix = process.env.DB_PREFIX;
let DBNamePrefix = `${DBEnvPrefix}newtrace_`;

exports.CONTAINER_NAMES = {
    PROTOTYPE_MASTER: `${DBNamePrefix}prototype_master`
}
