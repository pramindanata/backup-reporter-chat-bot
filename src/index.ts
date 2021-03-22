import 'reflect-metadata';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';

dotenv.config();
moduleAlias.addAlias('@', __dirname);

import { container } from 'tsyringe';
import { RedisClient } from 'redis';
import { createConnection } from 'typeorm';
import { InfraConfig } from './infra/config';
import { createREST } from './infra/rest';
import { PubSub } from './infra/pubsub';
import { RedisClientToken } from './infra/constant';
import { DomainEvent } from './infra/domain-event';

bootstrap();

async function bootstrap() {
  await createConnection();
  const config = container.resolve(InfraConfig);
  const redis = container.resolve<RedisClient>(RedisClientToken);
  const pubsub = container.resolve(PubSub);
  const domainEvent = container.resolve(DomainEvent);
  const rest = createREST();

  domainEvent.boot(onError);
  pubsub.boot(onError);

  redis.on('error', onError);

  rest.listen(config.get('rest.port'), () => {
    console.log(`[x] Server listening on port ${config.get('rest.port')}`);
  });
}

async function onError(err: any) {
  console.error(err);
}
