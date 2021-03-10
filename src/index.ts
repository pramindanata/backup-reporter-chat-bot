import 'reflect-metadata';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';

dotenv.config();
moduleAlias.addAlias('@', __dirname);

import { RedisClient } from 'redis';
import { createConnection } from 'typeorm';

import { config } from '@/config';
import { createServer } from '@/api';
import { attachSubscribers } from '@/pubsub';
import { container } from '@/container';
import { DepSymbol } from '@/shared/constant';

main();

async function main() {
  await createConnection();

  const server = createServer();

  server.listen(config.app.port, () => {
    console.log(`[x] Server listening on port ${config.app.port}`);
  });

  const redis = container.resolve<RedisClient>(DepSymbol.RedisClient);

  attachSubscribers();

  redis.on('error', (err) => {
    console.error(err);
  });
}
