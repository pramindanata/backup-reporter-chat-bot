import {
  TelegramAccountDTO,
  TelegramAccountDTOProps,
} from './telegram-account';

export class AccessTokenDTO {
  id: string;
  name: string;
  value: string;
  shortValue: string;
  activationStatus: string;
  createdAt: string;
  updatedAt: string;
  telegramAccountId?: string;
  telegramAccount?: TelegramAccountDTO;

  constructor(props: AccessTokenDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.value = props.value;
    this.shortValue = props.shortValue;
    this.activationStatus = props.activationStatus;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.telegramAccountId = props.telegramAccountId;

    if (props.telegramAccount) {
      this.telegramAccount = new TelegramAccountDTO(props.telegramAccount);
    }
  }
}

export interface AccessTokenDTOProps {
  id: string;
  name: string;
  value: string;
  shortValue: string;
  activationStatus: string;
  createdAt: string;
  updatedAt: string;
  telegramAccountId?: string;
  telegramAccount?: TelegramAccountDTOProps;
}
