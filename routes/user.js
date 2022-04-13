const db = require('../db');
const express = require('express');

const usersRouter = express.Router();

//GET USER
app.get('/:id', (req, res, next) => {
  db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
})
//GET ALL USERS

//POST NEW USER

//PUT UPDATE TO USER

//DELETE USER