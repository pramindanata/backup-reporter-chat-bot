import { User as TelegramUser } from 'typegram';
import { AccessToken } from '@/domain/entities';

export interface ActivateAccessTokenUOWContract {
  execute(accessToken: AccessToken, user: TelegramUser): Promise<void>;
}
