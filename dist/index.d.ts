import { RedisClient } from "./RedisClient";
declare let redisClient: RedisClient;
declare const redisInit: (url: string) => RedisClient;
export { redisInit, redisClient };
