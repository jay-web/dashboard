const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price: {
        type:String,
        required: true
    },
    category: {
        type:String,
        required: true
    },
    description: String,
    rating:Number,
    supply: Number

},
{timestamps: true}
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;