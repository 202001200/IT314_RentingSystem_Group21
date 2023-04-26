const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const { check, validationResult } = require('express-validator');
const authapikey = require('../middleware/authapikey.js');
router.get('/category/:category',authapikey, async(req,res)=>{
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

router.get('/',authapikey, async (req, res) => {
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

router.get('/:id',authapikey, async(req,res)=>{
    try{
        const product = Product.findById(req.params.id);
        res.send(product);
    }
    catch(err){
        res.statusCode = 500;
        res.send({
            error:true,
        })
    }
})
module.exports = router;
