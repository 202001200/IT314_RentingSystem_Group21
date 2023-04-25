const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const Borrower = require('../models/Borrower.js');
const Lender = require('../models/Lender.js');
const Product = require('../models/Product.js');
const authlender = require('../middleware/authlender.js');
const jwt = require('jsonwebtoken');
dotenv.config();

router.post(
    '/signup',
    [
        check('firstname', 'Enter a valid Firstname').not().isEmpty(),
        check('lastname', 'Enter a valid Lirstname').not().isEmpty(),
        check('email', 'Enter a valid Email Address').isEmail(),
        check('idproof', 'Please Enter a Id-Proof').not().isEmpty(),
        check('address', 'Enter a valid Address').not().isEmpty(),
        check('password', 'Enter a valid Firstname').isLength ({min: 8})
    ],
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({
                error: true,
                msg: errors.errors[0].msg,
            });
        }

        try {
            let lender = await Lender.findOne({
                email: req.body.email,
            });
            if (lender) {
                return res.send({
                    error: true,
                    msg: 'User already exists',
                });
            }

            lender = new Lender({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                idproof: req.body.idproof,
                address: req.body.address,
                password: req.body.password,
                username: '',
                requestforaddress: [],
                productlist: [],
                myorder: [],
            });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            lender.password = hashedPassword;

            const savedLender = await lender.save();
            res.send({
                error: false,
                userid: lender._id,
            });
        } catch (err) {
            console.log(err);
            res.send({
                error: true,
                msg: err.message,
            });
        }
    }

);

router.post(
    '/login',
    [
        check('email', 'Enter a valid Email Address').isEmail(),
        check('password', 'Enter a valid Firstname').isLength ({min: 8})
    ],
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({
                error: true,
                msg: errors.errors[0].msg,
            });
        }

        try {
            const lender = await Lender.findOne({
                email: req.body.email,
                phone_no: req.body.phone_no,
            });
            if (!lender) {
                return res.send({
                    error: true,
                    msg: 'User is not registered',
                });
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                lender.password
            );
            if (!validPassword) {
                return res.send({
                    error: true,
                    msg: 'Password is not valid',
                });
            }

            const token = jwt.sign(
                {
                    _id: lender._id,
                },
                process.env.TOKEN_SECRET
            );
            res.header('auth_token', token).send({
                error: false,
                auth_token: token,
            });
        } catch (err) {
            console.log(err);
            res.send({
                error: true,
                msg: err.message,
            });
        }
    }    

);

router.post('/forgot', async (req, res) => {
    try {
        const lender = await Lender.findOne({_id: req.body.lender});
        if (!Lender) {
            return res.send({
                error: true,
                msg: 'Enter a valid email',
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        lender.password = hashedPassword;
        await lender.save();
        res.send({
            error: false,
            msg: 'Password Changed',
        });
    } catch (err) {
        console.log(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
});

router.get('/detail', authlender, async (req, res) => {
    try {
        const lender = await Lender.find(
            mongoose.Types.ObjectId(req.lender._id)
        );
        res.send({
            error: false,
            lender: lender,
        });
    } catch (err) {
        console.log(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
});

router.post('/myproducts', async (req, res) => {
    try {
        let data = Product.find({ lender: req.body.lender_id }).then((data) => {
            res.send({
                error: false,
                data: data,
            });
        });
    } catch (err) {
        console.log(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
});

module.exports = router;
