import { AccessTokenRepositoryContract } from '@/domain/contracts/repositories';
import { AccessToken } from '@/domain/entities';
import { Repository, EntityRepository } from 'typeorm';
import { ORMAccessToken, ORMAccessTokenMapper } from '../entities';

@EntityRepository(ORMAccessToken)
export class ORMAccessTokenRepository
  extends Repository<ORMAccessToken>
  implements AccessTokenRepositoryContract {
  async getByValue(value: string): Promise<AccessToken | undefined> {
    const token = await this.findOne({
      value,
    });

    if (!token) {
      return undefined;
    }

    return ORMAccessTokenMapper.toDomain(token);
  }
}
