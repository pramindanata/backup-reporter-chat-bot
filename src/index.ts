import 'reflect-metadata';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';

dotenv.config();
moduleAlias.addAlias('@', __dirname);

import { container } from 'tsyringe';
import { createConnection } from 'typeorm';
import { InfraConfig } from './infra/config';
import { createREST } from './infra/rest';

bootstrap();

async function bootstrap() {
  await createConnection();
  const config = container.resolve(InfraConfig);
  const rest = createREST();

  rest.listen(config.get('rest.port'), () => {
    console.log(`[x] Server listening on port ${config.get('rest.port')}`);
  });
}
