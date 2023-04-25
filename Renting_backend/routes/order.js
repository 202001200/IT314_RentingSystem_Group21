const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @desc    System POST a order
// @route   POST /order
router.post(
    '/',
    [
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
