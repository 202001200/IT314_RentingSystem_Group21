const bcrypt = require('bcryptjs');
require('dotenv').config();
module.exports = async(req,res,next)=>{
    if(!req.header("api-key")){
        res.statusCode = 403;
        res.send({"error":"Unauthorized!"});
        return;
    }
    else{
        try{
            const v = await bcrypt.compare(process.env.API_SECRET,req.header("api-key"));
        if(!v){
            res.statusCode = 401;
            res.send({"error":"Invalid API Key"});
            return;
        }
        next();
        }
        catch(err){
            return res.status(400).send("Try Again!");
        }
    }
}
