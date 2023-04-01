const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
const {MongoClient} = require('mongodb');
const uri = "<hidden>";
const client = new MongoClient(uri);
app.use(cors());

app.get("/login",async (req,res)=>{
    try{
        await client.connect();
        const db=client.db("Accounts");
        const coll=db.collection("Users");
        const c=await coll.countDocuments({username:req.query.email});
        if(c){
            const data = await coll.findOne({username:req.query.email,password:req.query.password});
            if(data!==null) res.json(data);
            else res.json({"Authentication":"Failed"});
        }
        else{
            res.json({"exists": false});
        }
    }
    catch(e){
        if(e.code==='ETIMEOUT'){
            res.status(401).send('Network Error!');
        }
    }
    finally{
        client.close();
    }
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})