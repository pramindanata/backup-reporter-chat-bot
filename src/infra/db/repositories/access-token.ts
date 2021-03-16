import { AccessTokenRepositoryContract } from '@/app/contracts/repositories';
import { AbstractRepository, EntityRepository } from 'typeorm';
import { ORMAccessToken } from '../entities';

@EntityRepository(ORMAccessToken)
export class ORMAccessTokenRepository
  extends AbstractRepository<ORMAccessToken>
  implements AccessTokenRepositoryContract {
  doA(): string {
    return 'string';
  }
}
