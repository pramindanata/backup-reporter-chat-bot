import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TelegramAccount } from './telegram-account';

@Entity({
  name: 'access_tokens',
})
export class AccessToken {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({
    name: 'value',
  })
  value!: string;

  @Column({
    name: 'short_value',
  })
  shortValue!: string;

  @Column({
    name: 'activation_status',
  })
  activationStatus!: AccessTokenActivationStatus;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;

  @Column({
    name: 'telegram_account_id',
  })
  telegramAccountId!: string;

  @OneToOne(() => TelegramAccount, (account) => account.accessToken)
  @JoinColumn({
    name: 'telegram_account_id',
  })
  telegramAccount?: TelegramAccount;

  isActivated(): boolean {
    return this.activationStatus === AccessTokenActivationStatus.ACTIVATED;
  }
}

export enum AccessTokenActivationStatus {
  ACTIVATED = 'ACTIVATED',
  NOT_ACTIVATED = 'NOT_ACTIVATED',
}
