const { Pool } = require('pg');

const PG_URI = 'postgres://gylhmrrw:bgGS-ICZRBdDYGae6FDQsP7GUv-anxuB@kashin.db.elephantsql.com/gylhmrrw';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};