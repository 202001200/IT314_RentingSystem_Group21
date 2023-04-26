const jwt = require('jsonwebtoken')
require('dotenv').config();
module.exports = (req,res,next) =>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({
        msg:"Access denied"
    })

try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.lender = verified;
    next();
}
catch(err){
    return res.status(400).json({
        msg:"Please Login again"
    })
}
}
