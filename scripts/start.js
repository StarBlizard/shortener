const srequire = require('srequire');

srequire.setBaseRoutes(srequire('common/baseRoutes.json'));

const Logger = srequire('logger');

const env = Object.create(process.env);

env.NODE_ENV || (env.NODE_ENV = 'development');

// Scripts
const startServer     = require('./startServer');
const seedDatabase    = require('./seedDatabase');
const createDatabase  = require('./createDatabase');
const migrateDatabase = require('./migrateDatabase');

(async function() {
  const database = await createDatabase(env);
  Logger.info(`Database created with code: ${ database }`);

  const migration = await migrateDatabase(env);
  Logger.info(`Migration finished with code: ${ migration }`);

  if (env.NODE_ENV !== 'production') {
    const seed = await seedDatabase(env);
    Logger.info(`Seeding finished with code: ${ seed }`);
  }

  startServer();
})();
