const pool = require('./index.js');

//GET ALL PRODUCTS INFO
const getAllProducts = async () => { 
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM products', (error, result) => {
          if (error) {
              reject(error);
          } else {
              resolve(result.rows);
          };
        });
    });
};

//GET PRODUCTS BY CATEGORY
const getProductsByCategory = async (category) => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM products WHERE category = $1', [category], 
        (error, result) => {
          if (error) {
              reject(error);
          } else {
              resolve(result.rows);
          };
        });
    });
};

//GET PRODUCT BY ID
const getProductsById = async (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM products WHERE id = $1', [id], 
        (error, result) => {
          if (error) {
              reject(error);
          } else {
              resolve(result.rows);
          };
        });
    });
};

//POST NEW PRODUCT
const addProduct = async (product) => {
    return new Promise(function(resolve, reject) {
        pool.query('INSERT INTO products (name,category,price,num_in_stock) VALUES $1, $2, $3, $4 RETURNING name,category,price,num_in_stock', 
        [product.name,product.category,product.price,product.num_in_stock], 
        (error, result) => {
          if (error) {
              reject(error);
          } else {
              resolve(result.rows);
          };
        });
    });
};

//PUT UPDATE TO PRODUCT
const updateProduct = async (product) => {
    return new Promise(function(resolve, reject) {
        pool.query('UPDATE products SET name = $1, category = $2, price = $3, num_in_stock = $4 WHERE products.id = $5', 
        [product.name,product.category,product.price,product.num_in_stock,product.id], 
        (error, result) => {
          if (error) {
              reject(error);
          } else {
              resolve(result.rows);
          };
        });
    });
};

//DELETE PRODUCT FROM INVENTORY
const deleteProduct = async (productId) => {
    return new Promise(function(resolve, reject) {
        pool.query('DELETE FROM products WHERE id = $1', [productId], 
        (error, result) => {
          if (error) {
              reject(error);
          } else {
              resolve(result.rows);
          };
        });
    });
};

module.exports = {
    deleteProduct,
    updateProduct,
    getAllProducts,
    getProductsByCategory,
    getProductsById,
    addProduct
};