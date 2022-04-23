
const pool = require('./index.js');

const getAllUsers = async () => {
    const result = await pool.query(
        'SELECT * FROM users')
        .then((response) => response.rows);
    pool.end();
    return result;
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
    console.log(user);
    const result = await pool.query(
        'INSERT INTO users (username,password,role) VALUES ($1, $2, $3) RETURNING username;', 
        [username,password,role]);
    pool.end();
    return result;
};

const updateUser = async (user) => {
    return await pool.query(
        'UPDATE users SET username=$1, password=$2 WHERE users.id = $3', 
        [user.username,user.password,user.id]);
};

module.exports =
{ getAllUsers, deleteUser, getUser, updateUser, addUser };