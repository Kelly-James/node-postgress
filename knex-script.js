const settings   = require('./settings');
const input      = process.argv[2];
const connString = `postgres://${settings.user}:${settings.password}` +
    `@${settings.hostname}:${settings.port}/` +
    `${settings.database}?ssl=${settings.ssl}`

const knex       = require('knex')({
  client: 'pg',
  connection: connString,
  searchPath: 'knex,public',
});

knex.select('first_name', 'last_name', 'birthdate').from('famous_people')
    .where('famous_people.last_name', '=', `${input}`)
    .then((rows) => {
      const people = rows;
      console.log('Found 1 person(s) by the name '
                  + `${input}` + ' - 1: '
                  + people[0].first_name
                  + ' ' + people[0].last_name
                  + ', ' + 'born '
                  + people[0].birthdate);
    })
    .then(() => {
      console.log('Query complete');
      return knex.destroy();
  })
    .catch((error) => {
      console.error(error);
});
