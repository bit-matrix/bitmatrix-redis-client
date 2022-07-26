interface IRedisClient {
  addKey: (key: string, seconds: number, value: object) => Promise<string>;
  getAllKeys: () => Promise<string[]>;
  getDataByKey: <T>(key: string) => Promise<T>;
  getAllValues: <T>() => Promise<T[]>;
  removeKey: (key: string) => Promise<number>;
  removeKeys: (keys: string[]) => Promise<number>;
  updateField: (keys: string, value: string) => Promise<string>;
}

export default IRedisClient;
