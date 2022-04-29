const pool = require('./index.js');

//get all cart items by customer id
const getAllCartItems = async (customer_id) => {

    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM cart WHERE customer_id = $1', [customer_id], (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result.rows);
        };
      });
    });
}
//POST NEW CART ITEM BY CUSTOMER ID
const addItemToCart = async (customer_id,product_id,quantity) => {

    return new Promise(function(resolve, reject) {
      pool.query('INSERT INTO cart (customer_id,product_id,product_quantity,total_cost) VALUES ($1,$2,$3,$3*(select product_cost from products where id = $2))', [customer_id,product_id,quantity], (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result.rows);
        };
      });
    });
}
//PUT UPDATE ON CART ITEM BY CUSTOMER ID + PRODUCT ID
const updateItemInCart = async (customer_id,product_id,quantity) => {

    return new Promise(function(resolve, reject) {
      pool.query('UPDATE cart SET quantity = $1 WHERE customer_id = $2 AND product_id = $3', [quantity,customer_id,product_id], (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result.rows);
        };
      });
    });
}
//DELETE CART ITEM BY CUSTOMER ID + PRODUCT ID
const deleteItemInCart = async (customer_id,product_id) => {

    return new Promise(function(resolve, reject) {
      pool.query('DELETE FROM cart WHERE customer_id = $1 AND product_id = $2', [customer_id,product_id], (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result.rows);
        };
      });
    });
}
//DELETE ALL CART ITEMS BY CUSTOMER ID
const deleteCart = async (customer_id) => {

    return new Promise(function(resolve, reject) {
      pool.query('DELETE FROM cart WHERE customer_id = $1', [customer_id], (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result.rows);
        };
      });
    });
}
module.exports = {
    getAllCartItems,
    addItemToCart,
    updateItemInCart,
    deleteItemInCart,
    deleteCart
};