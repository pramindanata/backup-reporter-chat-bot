import { AccessTokenDTO, AccessTokenDTOProps } from './access-token';

export class TelegramAccountDTO {
  id: string;
  accountId: number;
  firstName: string;
  createdAt: string;
  updatedAt: string;
  accessToken?: AccessTokenDTO;

  constructor(props: TelegramAccountDTOProps) {
    this.id = props.id;
    this.accountId = props.accountId;
    this.firstName = props.firstName;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    if (props.accessToken) {
      this.accessToken = new AccessTokenDTO(props.accessToken);
    }
  }
}

export interface TelegramAccountDTOProps {
  id: string;
  accountId: number;
  firstName: string;
  createdAt: string;
  updatedAt: string;
  accessToken?: AccessTokenDTOProps;
}
