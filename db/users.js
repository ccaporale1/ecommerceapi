
const res = require('express/lib/response');
const pool = require('./index.js');


  
const getAllUsers = async () => {

    await pool.query('SELECT * FROM users;', (err, res) => {
        if (err) {
          throw err
        }
        return res.rows;
      })

    
};

const deleteUser = async (userId) => {
    return await pool.query(
        'DELETE FROM users WHERE id = $1', 
        [userId]);
};

const getUser = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1 LIMIT 1', 
        [userId]);
    pool.end();
    return result;
};

const addUser = async (user) => {
    const {username, password, role } = user;
    //'INSERT INTO users (username,password,role) VALUES ($1, $2, $3) RETURNING username;', [username,password,role])

    (async () => {
        // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await pool.connect()
        try {
          await client.query('BEGIN');
          const queryText = 'INSERT INTO users (username,password,role) VALUES ($1, $2, $3) RETURNING username';
          const res = await client.query(queryText, [username,password,role]);
          await client.query('COMMIT');
        } catch (e) {
          await client.query('ROLLBACK');
          throw e
        } finally {
          client.release();
          return res;
        }
      })().catch(e => console.error(e.stack));
};

const updateUser = async (user) => {
    return await pool.query(
        'UPDATE users SET username=$1, password=$2 WHERE users.id = $3', 
        [user.username,user.password,user.id]);
};

module.exports =
{ getAllUsers, deleteUser, getUser, updateUser, addUser };