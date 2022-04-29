const pool = require('./index.js');

//GET ORDER DETAILS
const getOrder = async (order_num) => {

    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM orders WHERE order_num = $1', [order_num], (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result.rows);
        };
      });
    });
}
//POST NEW ORDER
const addOrder = async (customer_id) => {
    //get last order num first so that order num can be incremented
    // order num is not row unique but must be unique for each order
    pool.query('SELECT order_num FROM orders ORDER BY order_num desc LIMIT 1', (error, result) => {
        if (error) {
            reject(error);
        } else {
            const newOrderNum = result.rows[0] + 1;
        }
    });
    return new Promise(function(resolve, reject) {
        pool.query('INSERT INTO orders (order_num,user_id,product_id,quanitity,price) VALUES (newOrderNum, SELECT * FROM cart WHERE customer_id = $1)', [customer_id], (error, result) => {
            if (error) {
                reject(error);
            } else {
                const finalOrder = result.rows;
                pool.query('DELETE FROM carts WHERE  = $1', [customer_id], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(finalOrder);
                    };
                });
            }   
        });
    });
}
//PUT UPDATE TO ORDER
// THIS IS A CRUDE BLANKET UPDATE STATEMENT - NOT APPLICABLE TO REAL LIFE ORDER UPDATES
const changeOrder = async (order_num,product_id,quantity,price) => {

    return new Promise(function(resolve, reject) {
      pool.query('UPDATE orders SET product_id = $2, quanitity = $3, price = $4 WHERE order_num = $1', [order_num,product_id,quantity,price], (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result.rows);
        };
      });
    });
}
// DELETE PRODUCT FROM ORDER
const deleteItemFromOrder = async (order_num,product_id) => {

    return new Promise(function(resolve, reject) {
      pool.query('DELETE FROM orders WHERE order_num = $1 AND product_id = $2', [order_num,product_id], (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result.rows);
        };
      });
    });
}
//DELETE ORDER
const deleteOrder = async (order_num) => {

    return new Promise(function(resolve, reject) {
      pool.query('DELETE FROM orders WHERE order_num = $1', [order_num], (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result.rows);
        };
      });
    });
}
module.exports = {
    addOrder,
    getOrder,
    deleteOrder,
    changeOrder,
    deleteItemFromOrder 
};