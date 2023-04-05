const dotenv = require('dotenv');
const express = require('express');
const router = express.Router;

dotenv.config();

router.post(
    '/register',
    [
        check('firstname', 'Enter a valid Firstname').not().isEmpty(),
        check('lastname', 'Enter a valid Lirstname').not().isEmpty(),
        check('email', 'Enter a valid Email Address').isEmail(),
        check('phone no.', 'Enter a valid Phone Number').isLength ({min: 10}),
        check('address', 'Enter a valid Address').not().isEmpty(),
        check('password', 'Enter a valid Firstname').isLength ({min: 8})
    ],



);

router.post(
    '/login',
    [
        check('email', 'Enter a valid Email Address').isEmail(),
        check('password', 'Enter a valid Firstname').isLength ({min: 8})
    ],
    

)
