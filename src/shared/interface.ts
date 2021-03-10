import { PubSubChannel } from './constant';

export type Ctor<T = Record<string, any>> = new (...args: any[]) => T;

export type AnyEnum<T = string> = T;

export interface EventListener<T> {
  handle: (payload: T) => Promise<void>;
}

export interface Subscriber<C extends PubSubChannel> {
  handle: <T extends C>(payload: PubSubPayloadDict[T]) => Promise<void>;
}

export interface PubSubPayloadDict {
  [PubSubChannel.AccessTokenDeleted]: AccessTokenDeletedPayload;
}

export interface AccessTokenDeletedPayload {
  id: string;
  title: string;
  value: string;
  shortValue: string;
  createdAt: string;
  updatedAt: string;
  telegramAccount: {
    id: string;
    accountId: number;
    firstName: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}
