const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_brand: {
        type: String,
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('Product',productSchema)