//const createServer = require('./app.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const productsRouter = require('./routes/products.js');
const usersRouter = require('./routes/users.js');
const cartsRouter = require('./routes/carts.js');
const ordersRouter = require('./routes/orders.js');

app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


if (process.env.LOGGING === 'true') {
  app.use(morgan('tiny'));
}
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/carts', cartsRouter);
//app.use('/orders', ordersRouter);
app.use(express.json());

const port = 3000;

const server = app.listen(3000, () => {
  console.log(`server listening on ${port}`);
});

module.exports = server;