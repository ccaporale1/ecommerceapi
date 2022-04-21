//const db = require('../db/index.js');
const express = require('express');
const { getAllProducts, getProductsByCategory, getProductById, addProduct, deleteProduct, updateProduct} = require('../db/products.js');
const productsRouter = express.Router();

//GET ALL PRODUCTS INFO
productsRouter.get('/', async (req,res,next) => {
    const allProducts = await getAllProducts();

    res.status(200).send(allProducts);
});

//GET PRODUCTS BY CATEGORY
productsRouter.get('/:category', async (req,res,next) => {
    const searchCategory = req.body.category;
    const categoryProducts = await getProductsByCategory(searchCategory);

    res.status(200).send(categoryProducts);
});

//GET PRODUCT BY ID
productsRouter.get('/:id', async (req,res,next) => {
    const productId = req.body.id;
    const product = await getProductsById(productId);

    res.status(200).send(product);
});
//POST NEW PRODUCT
productsRouter.post('/:id', async (req,res,next) => {

});

//PUT UPDATE TO PRODUCT
productsRouter.put('/:id', async (req,res,next) => {

});

//DELETE PRODUCT FROM INVENTORY
productsRouter.delete('/:id', (req,res,next) => {

});

module.exports = productsRouter;