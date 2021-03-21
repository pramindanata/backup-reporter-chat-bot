import { AccessToken } from '@/domain/entities';

export interface AccessTokenRepositoryContract {
  getByValue: (tokenValue: string) => Promise<AccessToken | undefined>;
}
