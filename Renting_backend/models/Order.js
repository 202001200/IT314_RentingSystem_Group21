const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//defining schema for order
const orderSchema = new Schema({
    borrowerid: {
        type: Schema.Types.ObjectId,
        ref: 'Borrower',
    },
    lenderid: {
        type: Schema.Types.ObjectId,
        ref: 'Lender',
    },
    productid: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
    },
    address: {
        type: String,
        require: true,
    },
    totalprice: {
        type: String,
        require: true,
    },
    paymentid: {
        type: String,
        require: false,
    },
    purchasedate: {
        type: Date,
        default: Date.now,
    },
    returndate: {
        type: Date,
        default: null,
    },
    delivered: {
        type: Boolean,
        default: false,
    },
});

// order collection creation 
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
