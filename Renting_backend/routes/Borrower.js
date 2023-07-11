const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Borrower = require("../models/Borrower.js");
const Lender = require("../models/Lender.js");
const authlender = require("../middleware/authlender.js");
const authborrower = require("../middleware/authborrower.js");
const authapikey = require("../middleware/authapikey.js");
const Product = require("../models/Product.js");

// Load config
dotenv.config();

// @desc    SignUp
// @route   POST /borrower/signup
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
    console.log("hello");
    if (!errors.isEmpty()) {
      return res.send({
        error: true,
        msg: errors.errors[0].msg,
      });
    }

    try {
      let borrower = await Borrower.findOne({
        email: req.body.email,
      });
      if (borrower) {
        return res.send({
          error: true,
          msg: "User already exists",
        });
      }

      borrower = new Borrower({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        lenderdetail: [],
        liveproduct: [],
        myorder: [],
        wishlist: [],
      });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(hashedPassword);
      borrower.password = hashedPassword;

      const savedBuyer = await borrower.save();
      res.send({
        error: false,
        userid: borrower._id,
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
// @route   POST /borrower/Login
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
            const borrower = await Borrower.findOne({
                email: req.body.email,
            });
            if (!borrower) {
                return res.send({
                    error: true,
                    msg: 'User is not registered',
                });
            }

            const validPassword = await bcrypt.compare(
                req.body.password,
                borrower.password
            );
            if (!validPassword) {
                return res.send({
                    error: true,
                    msg: 'Password is not valid',
                });
            }

            const token = jwt.sign(
                {
                    _id: borrower._id,
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
      const borrower = await Borrower.findById(req.borrower._id);
      res.send(borrower);
  } catch (err) {
      console.log(err);
      res.status(500).send({
          msg: err.message
      });
  }
});

// @desc    change password
// @route   GET /borrower/forgot
router.post('/forgot', authapikey, async (req, res) => {
    try {
        const borrower = await Borrower.findOne({_id : req.body.borrower});
        if (!borrower) {
            return res.send({
                error: true,
                msg: 'Enter a valid email',
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        borrower.password = hashedPassword;
        await borrower.save()
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
// @route   GET /borrower/updatemyorder
router.post('/updatemyorder', authapikey, async (req, res) => {
    try {
        const update = {
            $addToSet: {
                myorder: req.body.orderid,
            },
        };
        Borrower.findOneAndUpdate({ _id: req.body.borrower }, update, {
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
// @route   GET /borrower/updateWishlist
router.post('/updateWishlist', authapikey, async (req, res) => {
    try {
        const update = {
            $addToSet: {
                wishlist: req.body.product_id,
            },
        };
        await Borrower.findOneAndUpdate({ _id: req.body.borrower }, update, {
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
// @route   post /borrower/request
router.post('/request', authapikey, async (req, res) => {
    try {
        const filter = { _id: req.body.lender };
        const update = {
            $addToSet: {
                requestforaddress: req.body.borrower,
            },
        };

        let lender = Lender.findOneAndUpdate(filter, update, {
            new: false,
        }).then(
            res.send({
                error: false,
                msg: 'Request Sent to Lender',
            })
        );
    } catch (err) {
        console.log(err);
        res.send({
            error: true,
            msg: err.message,
        });
    }
});


// @desc    Show all address
// @route   post /borrower/address
router.post('/address', authapikey, async (req, res) => {
    try {
        let borrower = await Borrower.findById(req.body.borrower);
        const ids = await borrower.lenderdetail.map((lender)=>lender.lenderid);
        Lender.find(
            { _id: {$in:ids}},
            { firstname: 1, lastname: 1, address: 1,email:1, _id: 0 }
        ).then((data) => {
            res.send({
                error: false,
                data: data,
            });
        });
    } catch (err) {
        res.send({
            err: true,
            msg: err.message,
        });
    }
});

// @desc    Add item to Wishlist on clicking on 'Add to Wishlist' button
// @route   GET /borrower/getwishlist

router.post('/getwishlist', authapikey, async (req,res)=> {
    try {
        const borrower = await Borrower.findById(req.body.borrower)
        if (borrower.wishlist.length === 0)
        {
            return res.send({
                error: true,
                msg :"No items in the Wishlist"})
        }
        await Product.find({_id : borrower.wishlist}).then(data=>{
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
// @route GET /borrower/removeWishlist
router.put('/removeitem', authapikey, async (req,res)=> {
    try {
        
        const borrower = await Borrower.findOneAndUpdate({
            _id : req.body.borrower
        },
        {
            $pull :{
                wishlist : req.body.product
            }
        }
        )
        if (borrower.wishlist.length === 0)
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

//@desc Get all declined messages for a given borrowerid
//@routes  /borrower/getmessage
router.get('/getmessage/:id',authapikey, async(req,res)=>{
    try{
        let messages=await Borrower.find({_id:req.params.id},{message:1,_id:0});
        await Borrower.findOneAndUpdate({_id:req.params.id},{$pull:{message:{$exists:true}}});
        res.send({
          error:false,
          data:messages
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
//@route  /borrower/getname

router.get('/getname/:id',authapikey,async(req,res)=>{
    try{
         await Borrower.find({_id: req.params.id},{firstname:1,lastname:1,_id:0}).then(data=>{
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
