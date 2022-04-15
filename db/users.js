import { response } from 'express';
import db from './db.js';

export const getAllUsers = async () => {
    return await db.query(
        'SELECT * FROM users')
        .then((response) => response.rows);
};

export const deleteUser = async (userId) => {
    return await db.query(
        'DELETE FROM users WHERE id = $1', 
        [userId]);
};

export const getUser = async (userId) => {
    return await db.query(
        'SELECT * FROM users WHERE id = $1 LIMIT 1', 
        [userId]);
};

export const addUser = async (user) => {
    return await db.query(
        'INSERT INTO users (username,password) VALUES $1, $2', 
        [user.username,user.password]);
};

export const updateUser = async (user) => {
    return await db.query(
        'UPDATE users SET username=$1, password=$2 WHERE users.id = $3', 
        [user.username,user.password,user.id]);
};