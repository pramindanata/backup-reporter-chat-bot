import { AccessTokenActivationStatus } from '@/domain/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ORMTelegramAccount } from '../telegram-account';

@Entity({
  name: 'access_tokens',
})
export class ORMAccessToken {
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

  @OneToOne(() => ORMTelegramAccount, (account) => account.accessToken)
  @JoinColumn({
    name: 'telegram_account_id',
  })
  telegramAccount?: ORMTelegramAccount;
}
