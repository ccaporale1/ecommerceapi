const db = require('../db');
const express = require('express');

const productsRouter = express.Router();

//GET ALL PRODUCTS INFO
productsRouter.get('/', async (req,res,next) => {

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