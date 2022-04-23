const express = require('express');
const db = require('../db/users.js');

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
usersRouter.get('/:userId', async (req, res, next) => {
  const user = await db.getUser(req.params.userId);
    
    res.status(200).send(user);
});
//GET ALL USERS
usersRouter.get('/', async (req,res,next) => {
  const allUsers = await db.getAllUsers();

  res.status(200).send(allUsers);
});

//POST NEW USER
usersRouter.post('/', async (req,res) => {
  const newUser = req.body;
  
  try {
    const resolve = await db.addUser(newUser);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
  res.setHeader("Content-Type", "/json/");
  const sendUser = json.stringify(newUser);
  res.status(201).send(sendUser);
});
//PUT UPDATE TO USER
usersRouter.put('/:userId', async (req,res,next) => {
  if (req.user.id !== req.body.id) {
    res.status(400).send('user id does not match');
    return;
  }

  const userUpdate = {...req.user, ...req.body};

  await db.updateUser(userUpdate);
  res.send(200).send();
});
//DELETE USER
usersRouter.delete('/:userId', async (req, res) => {
  await db.deleteUser(req.user.id);

  res.status(204).send();
});

module.exports = usersRouter;