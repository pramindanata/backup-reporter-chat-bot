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
import { RedisClientToken } from './infra/constant';
import { PubSub } from './infra/pubsub';

bootstrap();

async function bootstrap() {
  await createConnection();
  const config = container.resolve(InfraConfig);
  const redis = container.resolve<RedisClient>(RedisClientToken);
  const pubsub = container.resolve(PubSub);

  pubsub.boot();
  redis.on('error', (err) => {
    console.error(err);
  });

  const rest = createREST();

  rest.listen(config.get('rest.port'), () => {
    console.log(`[x] Server listening on port ${config.get('rest.port')}`);
  });
}
