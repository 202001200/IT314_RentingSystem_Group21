require("dotenv").config();
const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to server..."))
.catch((err) => console.log(err));
}
