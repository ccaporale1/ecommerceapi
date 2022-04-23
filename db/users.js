const { response } = require('express');
const db = require('./index.js');

exports.getAllUsers = async () => {
    return await db.query(
        'SELECT * FROM users;')
        .then((response) => response.rows);
};

exports.deleteUser = async (userId) => {
    return await db.query(
        'DELETE FROM users WHERE id = $1', 
        [userId]);
};

exports.getUser = async (userId) => {
    return await db.query(
        'SELECT * FROM users WHERE id = $1 LIMIT 1', 
        [userId]);
};

exports.addUser = async (user) => {
    return await db.query(
        'INSERT INTO users (username,password,role) VALUES $1, $2, $3;', 
        [user.username,user.password,user.role]);
};

exports.updateUser = async (user) => {
    return await db.query(
        'UPDATE users SET username=$1, password=$2 WHERE users.id = $3', 
        [user.username,user.password,user.id]);
};