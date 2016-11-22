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
  console.log('Searching...');
  const sql = "SELECT * FROM famous_people WHERE famous_people.last_name = $1;"
  if(err) {
    return console.error('Connection Error', err);
  }
  client.query(sql, [`${input}`], (err, result) => {
    if(err) {
      return console.error('Error Running Query', err);
    }
    console.log(result.rows[0]);
  });
});
