const pg       = require('pg');
const settings = require('./settings');
const input    = process.argv[2];

const client   = new pg.Client({
  user         : settings.user,
  password     : settings.password,
  database     : settings.database,
  host         : settings.hostname,
  port         : settings.port,
  ssl          : settings.ssl
});

client.connect((err) => {
  if(err) {
    return console.error('Connection Error', err);
  }

  console.log('Searching...');

  const sql = "SELECT * FROM famous_people WHERE famous_people.last_name = $1;"

  client.query(sql, [`${input}`], (err, result) => {
    if(err) {
      return console.error('Error Running Query', err);
    }
    const person = result.rows[0];

    console.log('Found 1 person(s) by the name '
                + `${input}` + '- 1: '
                + person.first_name
                + ' ' + person.last_name
                + ', ' + 'born '
                + person.birthdate);

    client.end((err) => {
      if (err) throw err;
    });

  });
});
