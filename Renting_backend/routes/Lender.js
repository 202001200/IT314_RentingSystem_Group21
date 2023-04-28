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
const authapikey = require('../middleware/authapikey.js');
const jwt = require('jsonwebtoken');
dotenv.config({path:'../config/config.js'});

router.post(
    '/signup',
    [
        authapikey,
        check('firstname', 'Enter a valid Firstname').not().isEmpty(),
        check('lastname', 'Enter a valid Lirstname').not().isEmpty(),
        check('email', 'Enter a valid Email Address').isEmail(),
        check('idproof', 'Please Enter a Id-Proof').not().isEmpty(),
        check('address', 'Enter a valid Address').not().isEmpty(),
        check('password', 'Enter a valid Password').isLength ({min: 8})
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
        authapikey,
        check('email', 'Enter a valid Email Address').isEmail(),
        check('password', 'Enter a valid Password').isLength ({min: 8})
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

router.post('/forgot',authapikey, async (req, res) => {
    try {
        const lender = await Lender.findOne({_id: req.body.lender});
        if (!lender) {
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

router.get('/detail', [authapikey, authlender], async (req, res) => {
    try {
        const lender = await Lender.findById(req.lender._id);
        res.send({
            error: false,
            lenderData: lender,
        });
    } catch (err) {
        console.log(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
});

router.post('/myproducts', authapikey, async (req, res) => {
    try {
        const products=await Product.find({ lender: req.body.lender_id });
        res.send({
                error: false,
                data: products,
            });
    } catch (err) {
        console.log(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
});

router.post('/myrequest', authapikey, async (req, res) => {
    try {
        let lender = await Lender.findById(req.body.lender);
        await Borrower.find(
            { _id: lender.requestforaddress },
            { firstname: 1, lastname: 1, email: 1 }
        ).then((data) => {
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

router.post('/accept', authapikey, async (req, res) => {
    try {
        const filter = { _id: req.body.borrower };
        const update = {
            $addToSet: {
                lenderdetail:{
                lenderid:req.body.lender._id,
                lendername:req.body.lender.firstname+' '+req.body.lender.lastname,
                lenderaddress:req.body.lender.address
                }
            },
        };

        let accept = await Borrower.findOneAndUpdate(filter, update, {
            new: false,
        }).then(
            res.send({
                error: false,
                msg: 'Borrower given access sucessfully',
            })
        );
        await Lender.findOneAndUpdate(
            {
                _id: req.body.lender,
            },
            {
                $pull: {
                    requestforaddress: req.body.borrower,
                },
            }
        );
    } catch (err) {
        console.log(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
});

router.post('/decline',authapikey, async(req,res)=>{
    try{
        let lender = await Lender.findOneAndUpdate(
            {
                _id: req.body.lender,
            },
            {
                $pull: {
                    requestforaddress: req.body.borrower,
                },
            }
        );
        const filter = { _id: req.body.borrower };
        const update = {
            $push: {
                message: "The lender "+lender.firstname+" "+lender.lastname+" declined your request",
            },
        };
        let accept = await Borrower.findOneAndUpdate(filter, update, {
            new: true,
        }).then(
            res.send({
                error: false,
                msg: 'Borrower declined access sucessfully',
            })
        );

    }catch(err){
        console.log(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
})

router.get('/getname/:id',authapikey, async(req,res)=>{
    try{
         await Lender.find({_id: req.params.id},{firstname:1,lastname:1,_id:0}).then(data=>{
            res.send({
                error : false,
                data : data,
            }
            )
        })
    }catch(err){
        console.log(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
})

module.exports = router;
