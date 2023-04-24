const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const { check, validationResult } = require('express-validator');

router.get('/:category',async(req,res)=>{
    try{
        const products = await Product.find({
            category:{
                $eq:req.params.category
            }
        })
        res.send(products);
    }
    catch(err){
        res.statusCode = 500;
        res.send({
            error:true,
            msg: err.message
        })
    }
})

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).sort({
            createdAt:'desc'
        });
        res.send({
            error: false,
            product: products,
        });
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.send({
            error: true,
            msg: err.message,
        });
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const products = Product.findById(req.params.id);
        res.send(products);
    }
    catch(err){
        res.statusCode = 500;
        res.send({
            error:true,
            msg:err.message
        })
    }
})
module.exports = router;
