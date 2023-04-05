const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://KunjParekh:xyz123@cluster0.stcddrp.mongodb.net/?retryWrites=true&w=majority/RentingSystem")
.then(() => console.log("Connected to server..."))
.catch((err) => console.log(err));