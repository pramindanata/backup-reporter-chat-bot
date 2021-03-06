import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { AccessToken } from './access-token';

@Entity({
  name: 'telegram_accounts',
})
export class TelegramAccount {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    name: 'account_id',
  })
  accountId!: number;

  @Column({
    name: 'first_name',
  })
  firstName!: string;

  @Column()
  username?: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;

  @OneToOne(() => AccessToken, (token) => token.telegramAccount)
  accessToken?: AccessToken;
}
