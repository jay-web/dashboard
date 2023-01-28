const Product = require("../models/Product");
const ProductStat = require("../models/ProductStat");


exports.getProducts = async (req, res) => {
    try{
        const products = await Product.find();

        const productWithStat = await Promise.all(
            products.map(async (product) => {
               const stat =  await product.find({
                    productId: product._id
                });
                return {
                    ...product._doc,
                    stat
                }
            })
        );

        res.status(200).json(productWithStat);


    }catch(error){
        res.status(404).json({ message: error.message})
    }
}