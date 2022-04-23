const express = require('express');
const morgan = require('morgan');

//const cartsRouter = require('./routes/carts.js');
const productsRouter  = require('./routes/products.js');
const usersRouter = require('./routes/users.js');
//const orderRouter = require('./routes/orders.js');

const createServer = () => {
  const app = express();
  const api = express.Router();

  if (process.env.LOGGING === 'true') {
    app.use(morgan('tiny'));
  }

  api.use('/products', productsRouter);
  api.use('/users', usersRouter);
  //api.use('/carts', cartsRouter);
  //api.use('/orders', orderRouter);

  app.use(express.json());
  app.use('/api', api);
  return app;
};


module.exports = createServer;