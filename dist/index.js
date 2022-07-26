"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.redisInit = void 0;
const RedisClient_1 = require("./RedisClient");
let redisClient;
exports.redisClient = redisClient;
const redisInit = (url) => {
    exports.redisClient = redisClient = new RedisClient_1.RedisClient(url);
    return redisClient;
};
exports.redisInit = redisInit;
//# sourceMappingURL=index.js.map