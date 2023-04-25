const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Buyer = require("../models/Borrower.js");
const Seller = require("../models/Lender.js");
const authlender = require("../middleware/authlender.js");
const Product = require("../models/Product.js");

// Load config
dotenv.config();

// @desc    SignUp
// @route   POST /buyer/signup
router.post(
  "/signup",
  [
    check("firstname", "Please Enter a Valid Firstname").not().isEmpty(),
    check("lastname", "Please Enter a Valid Lastname").not().isEmpty(),
    check("address", "Please Enter a Valid Address").not().isEmpty(),
    check("email", "Please Enter a Valid E-mail").isEmail(),
    check("password", "Please Enter a Valid Password").isLength({
      min: 8,
    }),
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
      let buyer = await Buyer.findOne({
        email: req.body.email,
      });
      if (buyer) {
        return res.send({
          error: true,
          msg: "User already exists",
        });
      }

      buyer = new Buyer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        sellerdetail: [],
        liveproduct: [],
        myorder: [],
        wishlist: [],
      });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(hashedPassword);
      buyer.password = hashedPassword;

      const savedBuyer = await buyer.save();
      res.send({
        error: false,
        userid: buyer._id,
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

// @desc    SignIn | Login
// @route   POST /buyer/Login
router.post(
    '/login',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a valid password').isLength({
            min: 8,
        }),
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
            const buyer = await Buyer.findOne({
                email: req.body.email,
            });
            if (!buyer) {
                return res.send({
                    error: true,
                    msg: 'User is not registered',
                });
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                buyer.password
            );
            if (!validPassword) {
                return res.send({
                    error: true,
                    msg: 'Password is not valid',
                });
            }

            const token = jwt.sign(
                {
                    _id: buyer._id,
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

router.get("/detail", authlender, async (req, res) => {
  try {
      const seller = await Seller.find(mongoose.Types.ObjectId(req.seller._id));
      res.send(seller);
  } catch (err) {
      console.log(err);
      res.status(500).send({
          msg: err.message
      });
  }
});

// @desc    change password
// @route   GET /buyer/forgot
router.post('/forgot', async (req, res) => {
    try {
        const buyer = await Buyer.findOne({_id : req.body.buyer});
        if (!Buyer) {
            return res.send({
                error: true,
                msg: 'Enter a valid email',
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        buyer.password = hashedPassword;
        await buyer.save()
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

module.exports = router;
