const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    imagepath: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    formatofprice: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    lender: {
        type: Schema.Types.ObjectId,
        ref: 'Lender'
    },
    available: {
        type: Boolean,
        default: true
    },
    startdate: {
        type: Date,
        default: Date.now
    },
    enddate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
