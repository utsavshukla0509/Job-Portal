const mysqlClient = require("./dbClient");
const redisClient = require("./redisClient");

module.exports = Object.assign({},{
    mysqlClient : mysqlClient,
    redisClient : redisClient,
})