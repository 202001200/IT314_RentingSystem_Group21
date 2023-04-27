const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authapikey = require('../middleware/authapikey.js');
const authlender = require('../middleware/authlender.js');
const authborrower = require('../middleware/authborrower.js');
// @desc    System POST a order
// @route   POST /order
router.post(
    '/',
    [
        authapikey,
        check('address', 'Please Enter a Valid Address').not().isEmpty(),
        check('totalprice', 'Please Enter a Valid Price').not().isEmpty(),
        check('borrowerid','Please enter a valid buyer id').not().isEmpty(),
        check('lenderid','Please enter a valid seller id').not().isEmpty(),
        check('productid','Please enter a valid product id').not().isEmpty(),
        check('returndate','Please enter a valid return date').not().isEmpty(),
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
            const order = new Order({
                borrowerid: req.body.borrowerid,
                sellerid: req.body.sellerid,
                lenderid: req.body.lenderid,
                address: req.body.address,
                totalprice: req.body.price,
                paymentid: 'paytm123',
                returndate: req.body.returndate,
            });
            const ordersaved = await order.save();
            res.send({
                error: false,
                msg: 'Succsessfully Order Placed',
                orderid: ordersaved._id,
            });
        } catch (err) {
            console.error(err);
            res.send({
                error: true,
                msg: err.message,
            });
        }
    }
);

//get order using the id 
router.get('/:id', [authapikey, authlender], async (req, res) => {
    try {
        let order = await Order.findById(req.params.id);
        if (!order) {
            return res.send({
                error: true,
                msg: 'Order not found',
            });
        }
        res.send({
            error: false,
            order: order,
        });
    } catch (err) {
        console.error(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
});

// Lender getting his or her order using his or her lenderid
router.get('/lender/:lenderid', [authapikey, authlender], async (request, response) => {
    try {
        let orders = await Order.find({
            lenderid: {
                $eq: request.params.lenderid,
            },
        });
        if (!orders) {
            return res.send({
                error: true,
                msg: 'Orders not found',
            });
        }
        response.send({
            error: false,
            orders: orders,
        });
    } catch (error) {
        console.error(err);
        response.send({
            error: true,
            msg: err.message,
        });
    }
});

// Borrower get his or her order using his or her borrower id
router.get('/borrower/:borrowerid', [authapikey, authborrower], async (request, response) => {
    try {
        let orders = await Order.find({
            borrowerid: {
                $eq: request.params.borrowerid,
            },
        });
        if (!orders) {
            return res.send({
                error: true,
                msg: 'Orders not found',
            });
        }
        response.send({
            error: false,
            orders: orders,
        });
    } catch (error) {
        console.error(err);
        response.send({
            error: true,
            msg: err.message,
        });
    }
});

//Method to get all order 
router.get('/', [authapikey, authlender], async (req, res) => {
    try {
        const orders = await Order.find({});
        res.send({
            error: false,
            orders: orders,
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
