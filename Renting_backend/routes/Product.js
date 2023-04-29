const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const Order = require('../models/Order.js');
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
        const product = await Product.findById(req.params.id);
        res.send(product);
    }
    catch(err){
        res.statusCode = 500;
        res.send({
            error:true,
        })
    }
})

router.post('/lender',[
    authapikey,
    check('title','Please Enter the title').not().isEmpty(),
    check('imagepath','Please Enter a valid image-path').not().isEmpty(),
    check('description','Please Enter a valid Description').not().isEmpty(),
    check('price','Please enter the price').not().isEmpty(),
    check('formatofprice','Please Enter a Valid Format').not().isEmpty(),
    check('category','Please select a valid Category').not().isEmpty(),
    check('lender','Please Login').not().isEmpty()
    ],async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send({
                error:true,
                msg:errors.errors[0].msg
            })
        }
        try{
            const product = new Product({
                title: req.body.title,
                imagepath: req.body.imagepath,
                description: req.body.description,
                price: req.body.price,
                formatofprice: req.body.formatofprice,
                category: req.body.category,
                lender: req.body.lender,
                available: true,
                status: '-',
            });

            const productSaved = await product.save();
            res.send({
                error: false,
                msg: 'Succsessfully Saved Product',
            });
        } catch (err) {
            console.error(err);
            res.send({
                error: true,
                msg: err.message,
            });
        }
})
 
//Update Product by seller
router.put('/lender/:id',async(req,res)=>{
    try{
        let products = await Product.findById(req.params.id);
        if(!products){
            return res.send({
                error:true,
                msg:'Product Not Found!'
            });
        }
        product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.send({
            error: false,
            msg: 'Succsessfully Updated!',
        });
    } catch (err) {
        console.error(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
})

//Delete product from seller
router.delete('/lender/:id', async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.send({
                error: true,
                msg: 'Product Not Found',
            });
        }
        const isLive = await Order.find({productid:req.params.id});
        if(isLive.length){
            return res.send({
                error: true,
                msg: 'Product Already Lent!'
            })
        }
        await Product.deleteOne({
            _id: req.params.id,
        });
        res.send({
            error: false,
            msg: 'Successfully Deleted',
        });
    } catch (err) {
        console.error(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
});

module.exports = router;
