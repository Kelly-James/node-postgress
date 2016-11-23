// Update with your config settings.

const settings   = require('./settings');
const connString = `postgres://${settings.user}:${settings.password}` +
    `@${settings.hostname}:${settings.port}/` +
    `${settings.database}?ssl=${settings.ssl}`

module.exports = {

  development: {
    client: 'pg',
    connection: connString,
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
