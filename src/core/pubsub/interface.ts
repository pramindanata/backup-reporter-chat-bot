import { PubSubChannel } from './constant';

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
