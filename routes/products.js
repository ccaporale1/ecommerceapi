//const db = require('../db/index.js');
const express = require('express');
import { getAllProducts, getProductsByCategory, getProductById, addProduct, deleteProduct, updateProduct} from '../db/products'
const productsRouter = express.Router();

//GET ALL PRODUCTS INFO
productsRouter.get('/', async (req,res,next) => {
    const allProducts = await getAllProducts();

    res.status(200).send(allProducts);
});

//GET PRODUCTS BY CATEGORY
productsRouter.get('/:category', async (req,res,next) => {

});

//GET PRODUCT BY ID
productsRouter.get('/:id', async (req,res,next) => {

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