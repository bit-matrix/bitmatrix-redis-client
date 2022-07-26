import { RedisClient } from "./RedisClient";

let redisClient: RedisClient;

const redisInit = (url: string): RedisClient => {
  redisClient = new RedisClient(url);
  return redisClient;
};

export { redisInit, redisClient };
