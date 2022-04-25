
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
    const { full_name, password, role } = user;
    console.log(user);
    await pool.query('INSERT INTO users (full_name,password,role) VALUES ($1, $2, $3) RETURNING full_name,password,role', [full_name,password,role], (error, result) => {
        if (error) {
            console.log(error);
            return error;
        } else {
            return result.rows[0];
        };
    });
};

const updateUser = async (user) => {
    return await pool.query(
        'UPDATE users SET username=$1, password=$2 WHERE users.id = $3', 
        [user.username,user.password,user.id]);
};


module.exports =
{ getAllUsers, deleteUser, getUser, updateUser, addUser };