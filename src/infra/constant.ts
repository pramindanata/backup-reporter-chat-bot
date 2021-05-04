export enum Environment {
  DEV = 'development',
  PROD = 'production',
}

export const RedisClientToken = Symbol('RedisClient');
export const EventListenerDictToken = Symbol('EventListenerDictToken');
