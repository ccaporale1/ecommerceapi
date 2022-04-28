const express = require('express');

const db = require('../db/users.js');
const pool = require('./index.js');

const usersRouter = express.Router();


const validate = (user) => {
  if (typeof user.full_name !== 'string') {
    return 'username must be a string';
  }
  if (typeof user.password !== 'string') {
    return 'password must be a string';
  }

  return true;
};
  
const userValidation = (req, res, next) => {
  const valid = validate(req.body);

  if (valid === true) {
    next();
  } else {
    res.status(400).send(valid);
    return;
  }
};

//GET USER
usersRouter.get('/:userId', async (req, res, next) => {
  try {
    const user = await db.getUser(req.params.userId);
    res.body = user;
  } catch (err) {

    res.status(400).send(err.message);
    return;
  }  
  res.status(200).send();

});
//GET ALL USERS
usersRouter.get('/', async (req,res,next) => {
  const allUsers = await db.getAllUsers();

  res.setHeader("Content-Type", "application/json/");
  res.status(200).send(allUsers);
});

//POST NEW USER
usersRouter.post('/', userValidation, async (req,res) => {
  const newUser = req.body;
  try {
    await db.addUser(newUser);
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }
  
  res.setHeader("Content-Type", "application/json/");
  res.status(201).send(newUser);
});

//PUT UPDATE TO USER
usersRouter.put('/:userId', userValidation, async (req,res,next) => {
  if (req.user.id !== req.body.id) {
    res.status(400).send('user id does not match');
    return;
  }

  const userUpdate = {...req.user, ...req.body};

 
  try {
    await db.updateUser(userUpdate);
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }
  
  res.setHeader("Content-Type", "application/json/");
  res.status(200).send(userUpdate);
});
//DELETE USER
usersRouter.delete('/:userId', async (req, res) => {
  try {
    const userDel = await db.deleteUser(req.user.id);
    res.body = userDel;
  } catch (err) {
    res.status(400).send(err.message);
    return;
  }
  res.status(204).send();
});

module.exports = usersRouter;