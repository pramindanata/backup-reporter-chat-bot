import { TelegramAccount, TelegramAccountProps } from './telegram-account';

export class AccessToken {
  id: string;
  name: string;
  value: string;
  shortValue: string;
  activationStatus: AccessTokenActivationStatus;
  createdAt: Date;
  updatedAt: Date;
  telegramAccountId?: string;
  telegramAccount?: TelegramAccount;

  constructor(props: AccessTokenProps) {
    this.id = props.id;
    this.name = props.name;
    this.value = props.value;
    this.shortValue = props.shortValue;
    this.activationStatus = props.activationStatus;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.telegramAccountId = props.telegramAccountId;

    if (props.telegramAccount) {
      this.telegramAccount = new TelegramAccount(props.telegramAccount);
    }
  }

  isActivated(): boolean {
    return this.activationStatus === AccessTokenActivationStatus.ACTIVATED;
  }
}

export interface AccessTokenProps {
  id: string;
  name: string;
  value: string;
  shortValue: string;
  activationStatus: AccessTokenActivationStatus;
  createdAt: Date;
  updatedAt: Date;
  telegramAccountId?: string;
  telegramAccount?: TelegramAccountProps;
}

export enum AccessTokenActivationStatus {
  ACTIVATED = 'ACTIVATED',
  NOT_ACTIVATED = 'NOT_ACTIVATED',
}
