const db = require('../db');
const express = require('express');

const cartsRouter = express.Router();

cartsRouter.get('/:customerId', (req, res, next) => {
    const customer_id = req.params.customerId;
    db.query('SELECT * FROM cart WHERE customer_id = $1', [customer_id], (err, result) => {
        if(err) {
            return next(err); //in the case of an error, invoke the error-handling middleware
        } else if(result.rows.length === 0) { //if there is nothing in the customer's cart...
            return next(new Error('Your shopping cart is empty.')); //...invoke the error-handling middleware with a message to this effect
        } else {
            res.status(200).send(result.rows); //otherwise, send the contents of the cart back to the customer
        }
    });
});