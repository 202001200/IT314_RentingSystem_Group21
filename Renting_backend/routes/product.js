const express = require('express');
const router = express.Router();
const Product = require('../models/Product.js');
const { check, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send({
            error: false,
            product: products,
        });
    } catch (err) {
        console.error(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
});
