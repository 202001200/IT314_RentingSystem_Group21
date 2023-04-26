const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//lender schema 
const lenderschema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    idproof: {
        type: String,
        required: true,
        unique: true,
    },
    requestforaddress: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lender',
        },
    ],
    productlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    myorder: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
});

// lender collection creation 
const Lender = mongoose.model('Lender', lenderschema);

module.exports = Lender;

