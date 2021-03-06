const env = process.env;
const rootDir = getRootDir();

function getRootDir() {
  const dev = 'development';

  if (env.NODE_ENV === dev) {
    return `${__dirname}/src`;
  }

  return `${__dirname}/dist`;
}

module.exports = {
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: (env.DB_PORT && parseInt(env.DB_PORT)) || 5432,
  database: env.DB_NAME || 'backup_reporter',
  username: env.DB_USERNAME || 'postgres',
  password: env.DB_PASSWORD || '',
  logging: 'all',
  entities: [`${rootDir}/models/*.{js,ts}`],
};
