import { RedisClient } from "./RedisClient";
declare let redisClient: RedisClient;
declare const redisInit: (url?: string | undefined) => RedisClient;
export { redisInit, redisClient };
