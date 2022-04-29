//const db = require('../db/index.js');
const express = require('express');
const db = require('../db/products.js');
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
productsRouter.post('/', async (req,res,next) => {
    const newProduct = req.body;
    try {
        await db.addProduct(newProduct);
    } catch (err) {
        res.status(400).send(err.message);
        return;
    }
    //res.setHeader("Content-Type", "application/json/");
    res.status(201).send(newProduct);
});

//PUT UPDATE TO PRODUCT
productsRouter.put('/:id', async (req,res,next) => {
    if (req.product.id !== req.body.id) {
        res.status(400).send('product id does not match');
        return;
    }
    
    const productUpdate = {...req.product, ...req.body};

    
    try {
    await db.updateProduct(productUpdate);
    } catch (err) {
    res.status(400).send(err.message);
    return;
    }
      
      //res.setHeader("Content-Type", "application/json/");
      res.status(200).send(productUpdate);
    
});

//DELETE PRODUCT FROM INVENTORY
productsRouter.delete('/:id', async (req,res,next) => {
    try {
        const productDel = await db.deleteProduct(req.product.id);
        res.body = productDel;
      } catch (err) {
        res.status(400).send(err.message);
        return;
      }
      res.status(204).send();
});

module.exports = productsRouter;