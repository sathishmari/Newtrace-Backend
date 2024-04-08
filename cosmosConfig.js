const { CosmosClient } = require("@azure/cosmos");
const dotenv = require("dotenv");

dotenv.config();

// console.log("COSMOS_ACC_NAME : ", process.env.COSMOS_ACC_NAME);

// const endpoint = `https://${process.env.COSMOS_ACC_NAME}.documents.azure.com:443/`;
// const key = process.env.COSMOS_KEY;

// const client = new CosmosClient({ endpoint, key });

// const dbClient = async () => {
//     const { database } = await client.databases.createIfNotExists({ id: process.env.COSMOS_DB_NAME });
//     return database;
// };

// ===================================== LOCAL =================================================

// console.log("COSMOS_ACC_NAME : ", process.env.COSMOS_ACC_NAME);

// const endpoint = `https://127.0.0.1:8081/`;
// const key = `C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==`;

const endpoint = `https://dev-newtrace-db.documents.azure.com:443/`;
const key = `YeKnDr7zsQZD0YiuYi20g1mxyzw5wnVfJiCjjwU0Oe2J1wVMlcQQMAkb7TM0QazBAXySOSuv0zfCACDbidnVhw==`;

// const client = new CosmosClient({ endpoint, key });

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const client = new CosmosClient({ endpoint, key, connectionPolicy: {
    requestTimeout: 30000,
    enableEndpointDiscovery: false // May need to add this depending on your configuration
},
agentOptions: {
    rejectUnauthorized: false
}});

const dbClient = async () => {
    const { database } = await client.databases.createIfNotExists({ id: process.env.COSMOS_DB_NAME });
    return database;
};

// ====================================== LOCAL =================================================

exports.dbClient = dbClient;