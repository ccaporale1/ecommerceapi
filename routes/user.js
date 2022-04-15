import Router from 'express-promise-router';
import { getAllUsers, deleteUser, getUser, updateUser } from '../db/users';

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
  const user = await getUser(req.params.userId);
    
    res.status(200).send(user);
});
//GET ALL USERS
usersRouter.get('/', async (req,res,next) => {
  const allUsers = await getAllUsers();

  res.status(200).send(allUsers);
});

//POST NEW USER
usersRouter.post('/', async (req,res,next) => {
  const newUser = req.body;

  try {
    await add(newUser);
  } catch (error) {
    res.status(400).send(error.message);
    return;
  }
  res.status(201).send(newUser);
});
//PUT UPDATE TO USER
usersRouter.put('/:userId', async (req,res,next) => {
  if (req.user.id !== req.body.id) {
    res.status(400).send('user id does not match');
    return;
  }

  const userUpdate = {...req.user, ...req.body};

  await updateUser(userUpdate);
  res.send(200).send();
});
//DELETE USER
usersRouter.delete('/:userId', async (req, res) => {
  await deleteUser(req.user.id);

  res.status(204).send();
});

export default usersRouter;