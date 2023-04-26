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
const authborrower = require("../middleware/authborrower.js");
const authapikey = require("../middleware/authapikey.js");
const Product = require("../models/Product.js");

// Load config
dotenv.config();

// @desc    SignUp
// @route   POST /buyer/signup
router.post(
  "/signup",
  [
    authapikey,
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
        authapikey,
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

router.get("/detail", [authapikey,authborrower], async (req, res) => {
  try {
      const buyer = await Buyer.findById(req.borrower._id);
      res.send(buyer);
  } catch (err) {
      console.log(err);
      res.status(500).send({
          msg: err.message
      });
  }
});

// @desc    change password
// @route   GET /buyer/forgot
router.post('/forgot', authapikey, async (req, res) => {
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

// @desc    Add Order to MyOrder on clicking on 'Buy Now' button
// @route   GET /buyer/updatemyorder
router.post('/updatemyorder', authapikey, async (req, res) => {
    try {
        const update = {
            $addToSet: {
                myorder: req.body.orderid,
            },
        };
        Buyer.findOneAndUpdate({ _id: req.body.buyer }, update, {
            new: true,
            runValidators: true,
        }).then(
            res.send({
                error: false,
                msg: 'Added to MyOrders',
            })
        );
    } catch (error) {
        console.log(error);
        res.send({
            error: true,
            msg: error.message,
        });
    }
});

// @desc    Add Order to Wishlist on clicking on 'Add to Wishlist' button
// @route   GET /buyer/updateWishlist
router.post('/updateWishlist', authapikey, async (req, res) => {
    try {
        const update = {
            $addToSet: {
                wishlist: req.body.product_id,
            },
        };
        await Buyer.findOneAndUpdate({ _id: req.body.buyer }, update, {
            new: true,
            runValidators: true,
        }).then(
            res.send({
                error: false,
                msg: 'Added to wishlist',
            })
        );
    } catch (error) {
        console.log(error);
        res.send({
            error: true,
            msg: error.message,
        });
    }
});

// @desc    Request address
// @route   post /buyer/request
router.post('/request', authapikey, async (req, res) => {
    try {
        const filter = { _id: req.body.seller };
        const update = {
            $addToSet: {
                requestforaddress: req.body.buyer,
            },
        };

        let seller = await Seller.findOneAndUpdate(filter, update, {
            new: false,
        }).then(
            res.send({
                error: false,
                msg: 'Request Send to Seller',
            })
        );
    } catch (err) {
        console.log(error);
        res.send({
            error: true,
            msg: error.message,
        });
    }
});

module.exports = router;

// @desc    Show all address
// @route   post /buyer/address
router.post('/address', authapikey, async (req, res) => {
    try {
        let buyer = await Buyer.findById(req.body.buyer);
        await Seller.find(
            { _id: buyer.sellerdetail },
            { firstname: 1, lastname: 1, address: 1,email:1, _id: 0 }
        ).then((data) => {
            res.send({
                error: false,
                data: data,
            });
        });
    } catch (err) {
        console.log(error);
        res.send({
            error: true,
            msg: error.message,
        });
    }
});

// @desc    Add item to Wishlist on clicking on 'Add to Wishlist' button
// @route   GET /buyer/getwishlist

router.post('/getwishlist', authapikey, async (req,res)=> {
    try {
        const buyer = await Buyer.findById(req.body.buyer)
        if (buyer.wishlist.length === 0)
        {
            return res.send({
                error: true,
                msg :"No items in the Wishlist"})
        }
        await Product.find({_id : buyer.wishlist}).then(data=>{
            res.send({
                error : false,
                data : data})
        })
        
    } catch (error) {
        console.log(error);
        res.send({
            error: true,
            msg: error.message,
    });
    }
});

// @desc  Remove an item from wishlist when clicked on remove from Wishlist
// @route GET /buyer/removeWishlist
router.put('/removeitem', authapikey, async (req,res)=> {
    try {
        
        const buyer = await Buyer.findOneAndUpdate({
            _id : req.body.buyer
        },
        {
            $pull :{
                wishlist : req.body.product
            }
        }
        )
        if (buyer.wishlist.length === 0)
        {
            return res.send({
                error: true,
                msg :"No items in to remove from Wishlist"})
        }
        else
        {
            res.send({
                error: false,
                msg: "Product Removed"});
        }
    } catch (error) {
        console.log(error);
        res.send({
            error: true,
            msg: error.message,
    });
    }
})

//@desc Get all declined messages for a given buyerid
//@routes  /buyer/getmessage
router.get('/getmessage/:id',[authapikey, authlender], async(req,res)=>{
    try{
        await Buyer.find({_id:req.params.id},{message:1,_id:0}).then(data=>{
            res.send({
                error:false,
                data: data,
            })
        })
    }catch(err){
        console.log(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
})

//@desc  Get the name of th ebuuyer from the id
//@route  /buyer/getname

router.get('/getname/:id',[authapikey, authlender],async(req,res)=>{
    try{
         await Buyer.find({_id: req.params.id},{firstname:1,lastname:1,_id:0}).then(data=>{
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
