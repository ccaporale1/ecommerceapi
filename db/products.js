const { response } = require('express');
const db = require('./index.js');

//GET ALL PRODUCTS INFO
exports.getAllProducts = async () => {
    return await db.query(
        'SELECT * FROM products')
        .then((response) => response.rows);
};

//GET PRODUCTS BY CATEGORY
exports.getProductsByCategory = async (category) => {
    return await db.query(
        'SELECT * FROM products WHERE category = $1', 
        [category])
        .then((response) => response.rows);
};

//GET PRODUCT BY ID
exports.getProductsById = async (id) => {
    return await db.query(
        'SELECT * FROM products WHERE id = $1', 
        [id])
        .then((response) => response.rows);
};

//POST NEW PRODUCT
exports.addProduct = async (product) => {
    return await db.query(
        'INSERT INTO products (name,category,price,num_in_stock) VALUES $1, $2, $3, $4', 
        [product.name,product.category,product.price,product.num_in_stock]);
};

//PUT UPDATE TO PRODUCT
exports.updateProduct = async (product) => {
    return await db.query(
        'UPDATE products SET name = $1, category = $2, price = $3, num_in_stock = $4 WHERE products.id = $5', 
        [product.name,product.category,product.price,product.num_in_stock,product.id]);
};

//DELETE PRODUCT FROM INVENTORY
exports.deleteProduct = async (productId) => {
    return await db.query(
        'DELETE FROM products WHERE id = $1', 
        [productId]);
};