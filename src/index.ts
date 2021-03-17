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
import { createPubSub } from './infra/pubsub';
import { RedisClientToken } from './infra/constant';

bootstrap();

async function bootstrap() {
  await createConnection();
  const config = container.resolve(InfraConfig);
  const redis = container.resolve<RedisClient>(RedisClientToken);
  const pubsub = createPubSub();
  const rest = createREST();

  pubsub.boot();

  redis.on('error', (err) => {
    console.error(err);
  });

  rest.listen(config.get('rest.port'), () => {
    console.log(`[x] Server listening on port ${config.get('rest.port')}`);
  });
}
