import { AccessToken } from '@/entities';

export interface AccessTokenRepositoryContract {
  getByValue: (tokenValue: string) => Promise<AccessToken | undefined>;
}
