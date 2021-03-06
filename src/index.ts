import 'reflect-metadata';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';

dotenv.config();
moduleAlias.addAlias('@', __dirname);

import { createConnection } from 'typeorm';
import { config } from '@/config';
import { createServer } from '@/api';

main();

async function main() {
  await createConnection();

  const app = createServer();

  app.listen(config.app.port, () => {
    console.log(`[x] Server listening on port ${config.app.port}`);
  });
}
