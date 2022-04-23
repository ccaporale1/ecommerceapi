require('dotenv').config({ path: './db/.env' });

const initOptions = {
  // global event notification;
  error(error, e) {
      if (e.cn) {
          // A connection-related error;
          //
          // Connections are reported back with the password hashed,
          // for safe errors logging, without exposing passwords.
          console.log('CN:', e.cn);
          console.log('EVENT:', error.message || error);
      }
  }
};
  
const pgp = require('pg-promise')(initOptions);
  
// using an invalid connection string:
const db = pgp(`postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`);
  
db.connect()
  .then(obj => {
      // Can check the server version here (pg-promise v10.1.0+):
      const serverVersion = obj.client.serverVersion;

      obj.done(); // success, release the connection;
  })
  .catch(error => {
      console.log('ERROR:', error.message || error);
});

async function testConnection() {
  const c = await db.connect(); // try to connect
  c.done(); // success, release connection
  return c.client.serverVersion; // return server version
}
const log = testConnection();

console.log(log);