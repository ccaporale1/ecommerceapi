const {Pool, CLient} = require("pg");
require('dotenv').config();

const credentials = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};
console.log(credentials);
// Connect with a connection pool.
const connectionString = `postgresql://${credentials.user}:${credentials.password}@${credentials.host}:${credentials.port}/${credentials.database}`
console.log(connectionString);

const prodConfig = {
  connectionString: connectionString,
  ssl: {
      rejectUnauthorized: false
    } 
}

const pool = new Pool({
  connectionString,
});


module.exports = pool;