import { EntityRepository, Repository } from 'typeorm';
import { AccessToken } from '@/shared/models';

@EntityRepository(AccessToken)
export class AccessTokenRepository extends Repository<AccessToken> {}
