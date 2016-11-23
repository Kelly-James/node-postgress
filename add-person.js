const settings   = require('./settings');
const input      = process.argv;
const connString = `postgres://${settings.user}:${settings.password}` +
    `@${settings.hostname}:${settings.port}/` +
    `${settings.database}?ssl=${settings.ssl}`

const knex       = require('knex')({
  client    : 'pg',
  connection: connString,
  searchPath: 'knex,public',
});

knex('famous_people').insert({
                      first_name: `${input[2]}`,
                      last_name: `${input[3]}`,
                      birthdate: `${input[4]}`
                    })
  .then(() => {
      console.log('Query complete');
      return knex.destroy();
});
