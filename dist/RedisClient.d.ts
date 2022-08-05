import { poolTxInfo } from "@bitmatrix/models/PoolTxInfo";
import { Custom } from "./Custom";
import IRedisClient from "./IRedisClient";
export declare class RedisClient implements IRedisClient {
    private redisClient;
    constructor(url?: string);
    addKey: (key: string, seconds: number, value: object) => Promise<string>;
    getTTL: (key: string) => Promise<number>;
    getAllKeys: () => Promise<string[]>;
    getDataByKey: <T>(key: string) => Promise<T>;
    getAllValues: <T>() => Promise<T[]>;
    removeKey: (key: string) => Promise<number>;
    removeKeys: (keys: string[]) => Promise<number>;
    updateField: <T extends Custom>(key: string, value: poolTxInfo) => Promise<string>;
    subscribe: (channel: string) => Promise<string>;
    publish: (channel: string, message: string) => Promise<number>;
}
