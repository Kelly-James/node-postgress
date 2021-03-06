const pg       = require('pg');
const settings = require('./settings');

const client   = new pg.Client ({
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
  client.query("select * from fleets where fleets.name = $1;", [''], (err, result) => {
    if(err) {
      return console.error('Error Running Query', err);
    }
    console.log(result.rows[0]);
  });
});
