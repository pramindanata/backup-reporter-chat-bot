import { AccessTokenDTO } from '../dto';

export * from './subscribers';

export enum PubSubChannel {
  AccessTokenDeleted = 'AccessTokenDeleted',
}

export interface PubSubPayloadDict {
  [PubSubChannel.AccessTokenDeleted]: AccessTokenDTO;
}
