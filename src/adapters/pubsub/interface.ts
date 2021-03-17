import { AccessTokenDTO } from '../dto';
import { PubSubChannel } from './constant';

export interface PubSubPayloadDict {
  [PubSubChannel.AccessTokenDeleted]: AccessTokenDTO;
}
