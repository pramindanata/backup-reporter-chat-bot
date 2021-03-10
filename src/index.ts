import 'reflect-metadata';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';

dotenv.config();
moduleAlias.addAlias('@', __dirname);

import { RedisClient } from 'redis';
import { createConnection } from 'typeorm';

import { config } from '@/config';
import { createServer } from '@/api';
import { container } from '@/container';
import { DepSymbol } from '@/shared/constant';
import { PubSub } from '@/core/pubsub';

main();

async function main() {
  await createConnection();

  const redis = container.resolve<RedisClient>(DepSymbol.RedisClient);
  const pubsub = container.resolve(PubSub);

  pubsub.boot();
  redis.on('error', (err) => {
    console.error(err);
  });

  const server = createServer();

  server.listen(config.app.port, () => {
    console.log(`[x] Server listening on port ${config.app.port}`);
  });
}
