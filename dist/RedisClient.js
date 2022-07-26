"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const redis = __importStar(require("redis"));
class RedisClient {
    constructor(url) {
        this.addKey = (key, seconds, value) => __awaiter(this, void 0, void 0, function* () { return this.redisClient.SETEX(key, seconds, JSON.stringify(value)); });
        this.getTTL = (key) => __awaiter(this, void 0, void 0, function* () { return this.redisClient.TTL(key); });
        this.getAllKeys = () => __awaiter(this, void 0, void 0, function* () { return yield this.redisClient.keys("*"); });
        this.getDataByKey = (key) => __awaiter(this, void 0, void 0, function* () { return this.redisClient.get(key).then((response) => (response ? JSON.parse(response) : {})); });
        this.getAllValues = () => __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.getAllKeys();
            if (keys.length > 0) {
                const valuesPromises = keys.map((key) => this.redisClient.get(key));
                const values = yield Promise.all(valuesPromises);
                return values.map((val) => (val ? JSON.parse(val) : {}));
            }
            return [];
        });
        this.removeKey = (key) => __awaiter(this, void 0, void 0, function* () { return this.redisClient.del(key); });
        this.removeKeys = (keys) => __awaiter(this, void 0, void 0, function* () { return this.redisClient.del(keys); });
        this.updateField = (key, value) => __awaiter(this, void 0, void 0, function* () {
            const ttl = yield this.getTTL(key);
            const data = yield this.getDataByKey(key);
            data.poolTxId = value;
            //it will return OK
            return this.addKey(key, ttl, data);
        });
        this.subscribe = (channel) => __awaiter(this, void 0, void 0, function* () {
            let data = "";
            yield this.redisClient.subscribe(channel, (message) => {
                data = message;
            });
            return data;
        });
        this.publish = (channel, message) => __awaiter(this, void 0, void 0, function* () {
            return this.redisClient.publish(channel, message);
        });
        // if url is optional application will start using default redis url
        this.redisClient = redis.createClient({
            url,
        });
        this.redisClient.connect();
    }
}
exports.RedisClient = RedisClient;
//# sourceMappingURL=RedisClient.js.map