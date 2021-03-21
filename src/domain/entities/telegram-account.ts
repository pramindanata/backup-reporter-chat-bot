import { AccessToken, AccessTokenProps } from './access-token';

export class TelegramAccount {
  id: string;
  accountId: number;
  firstName: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken?: AccessToken;

  constructor(props: TelegramAccountProps) {
    this.id = props.id;
    this.accountId = props.accountId;
    this.firstName = props.firstName;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    if (props.accessToken) {
      this.accessToken = new AccessToken(props.accessToken);
    }
  }
}

export interface TelegramAccountProps {
  id: string;
  accountId: number;
  firstName: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken?: AccessTokenProps;
}
