require("dotenv").config();
const mongoose = require('mongoose');

module.exports = ()=>{
    mongoose.connect("mongodb+srv://hs0033947:abcd@cluster0.ias4awj.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("Connected to server..."))
.catch((err) => console.log(err));
}
