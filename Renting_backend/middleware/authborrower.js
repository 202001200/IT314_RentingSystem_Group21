const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
    const token = req.header('auth_token');
    console.log(token);
    if (!token)
        return res.send({
            error: true,
            msg: 'Access denied',
        });

    try {
        console.log("Here...");
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.borrower = verified;
        next();
    } catch (err) {
        return res.send({
            error: true,
            msg: 'Please Login again',
        });
    }
};
