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

cartsRouter.post('/:customerId', (req,res,next) => {
    const customer_id = req.params.customerId;
    const product_id = req.params.productId;
    const quantity = req.params.quantity;
    db.query('INSERT INTO cart (customer_id,product_id,product_quantity,total_cost) VALUES ($1,$2,$3,$3*(select product_cost from products where id = $2))', [customer_id,product_id,quantity], (err,result) => {
        if(err) {
            return next(err); //in the case of an error, invoke the error-handling middleware
        } else {
            res.status(200).send(); //otherwise, create the cart 
        }
    });
});