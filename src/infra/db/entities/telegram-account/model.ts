import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { ORMAccessToken } from '../access-token';

@Entity({
  name: 'telegram_accounts',
})
export class ORMTelegramAccount {
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

  @OneToOne(() => ORMAccessToken, (token) => token.telegramAccount)
  accessToken?: ORMAccessToken;
}
