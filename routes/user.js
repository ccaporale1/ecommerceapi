const db = require('../db');
const express = require('express');

const usersRouter = express.Router();

const validateUser = (user) => {
  //username
  if (typeof user.username !== 'string') {
    //error
  }
  //password
  if (typeof user.password !== 'string') {
    //error
  }
  //email address
  if (typeof user.email !== 'string' ) {
    //error
  }
}
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