const db = require('../db/orders.js');
const express = require('express');

const ordersRouter = express.Router();

//GET ORDER DETAILS
ordersRouter.get('/:orderNumber', async (req, res) => {
    const order_num = req.params.order_num;

    try {
        const order = await db.getOrder(customer_id)
        res.body = order;
    } catch (err) {
        res.status(400).send(err.message);
    }    

    if(order.rows.length === 0) { 
        res.status(400).send('Your order is empty.'); //...invoke the error-handling middleware with a message to this effect
    } else {
        res.status(200).send(res.body); //otherwise, send the contents of the cart back to the customer
    }
    
});
//POST NEW ORDER
// this is the "Checkout" endpoint
ordersRouter.post('/:customerId', async (req,res) => {
    const customer_id = req.params.customerId;
    
    try {
        await db.addOrder(customer_id);
    } catch (err) {
        res.status(400).send(err.message);
    }
   
    res.status(200).send(); 

});
//PUT UPDATE TO ORDER
ordersRouter.put('/:orderNum', async (req,res) => {
    const order_num = req.params.order_num;
    const product_id = req.params.productId;
    const quantity = req.params.quantity;
    const price = req.params.price;
    try {
        await db.changeOrder(order_num,product_id,quantity,price);
    } catch (err) {
        res.status(400).send(err.message);
    }
   
    res.status(200).send();
});
//DELETE ORDER ITEM BY CUSTOMER ID + PRODUCT ID
// AND
//DELETE ALL ORDER ITEMS BY CUSTOMER ID
ordersRouter.delete('/:order_num', async (req,res) => {
    const customer_id = req.params.customerId;
    
    if (req.params.productId) {
        const product_id = req.params.productId;
        try {
            await db.deleteItemFromOrder(customer_id,product_id);
        } catch (err) {
            res.status(400).send(err.message);
        }
    } else {
        try {
            await db.deleteOrder(customer_id);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
    
   
    res.status(200).send();
});
