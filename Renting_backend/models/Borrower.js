const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining schema 
const borrowerSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    lenderdetail: [{
        lenderid: {
            type: Schema.Types.ObjectId,
            ref: 'Seller'
        },
        lendername: {
            type: String,
        },
        lenderaddress: {
            type: String,
        }
    }],
    liveproduct: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    myorder: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    whishlist: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
});

//collection creation
const Borrower = mongoose.model("Borrower", borrowerSchema);

module.exports = Borrower;