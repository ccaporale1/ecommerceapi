const db = require('../db/carts.js');
const express = require('express');

const cartsRouter = express.Router();
//GET CART ITEMS BT CUSTOMER ID
cartsRouter.get('/:customerId', async (req, res) => {
    const customer_id = req.params.customerId;

    try {
        const cart = await db.getAllCartItems(customer_id)
        res.body = cart;
    } catch (err) {
        res.status(400).send(err.message);
    }    

    if(cart.rows.length === 0) { //if there is nothing in the customer's cart...
        res.status(400).send('Your shopping cart is empty.'); //...invoke the error-handling middleware with a message to this effect
    } else {
        res.status(200).send(res.body); //otherwise, send the contents of the cart back to the customer
    }
    
});
//POST NEW CART ITEM BY CUSTOMER ID
cartsRouter.post('/:customerId', async (req,res) => {
    const customer_id = req.params.customerId;
    const product_id = req.params.productId;
    const quantity = req.params.quantity;
    try {
        await db.addItemToCart(customer_id,product_id,quantity);
    } catch (err) {
        res.status(400).send(err.message);
    }
   
    res.status(200).send(); //otherwise, create the cart 

});
//PUT UPDATE ON CART ITEM BY CUSTOMER ID + PRODUCT ID
cartsRouter.put('/:customerId', async (req,res) => {
    const customer_id = req.params.customerId;
    const product_id = req.params.productId;
    const quantity = req.params.quantity;
    try {
        await db.updateItemInCart(customer_id,product_id,quantity);
    } catch (err) {
        res.status(400).send(err.message);
    }
   
    res.status(200).send();
});
//DELETE CART ITEM BY CUSTOMER ID + PRODUCT ID
// AND
//DELETE ALL CART ITEMS BY CUSTOMER ID
cartsRouter.delete('/:customerId', async (req,res) => {
    const customer_id = req.params.customerId;
    
    if (req.params.productId) {
        const product_id = req.params.productId;
        try {
            await db.deleteItemInCart(customer_id,product_id);
        } catch (err) {
            res.status(400).send(err.message);
        }
    } else {
        try {
            await db.deleteCart(customer_id);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
    
   
    res.status(200).send();
});

