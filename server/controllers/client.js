const Product = require("../models/Product");
const ProductStat = require("../models/ProductStat");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const getCountryISO3 = require("country-iso-2-to-3");

exports.getProducts = async (req, res) => {
    try{
        const products = await Product.find();

        const productWithStat = await Promise.all(
            products.map(async (product) => {
               const stat =  await ProductStat.find({
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

exports.getCustomers = async (req, res) => {
    try{
        const customers = await User.find({ role: 'user'}).select("-password");

        res.status(200).json(customers);

    }catch(error){
        res.status(404).json({ message: error.message})
    }
}

exports.getTransactions = async (req, res) => {
    try{
        // ? Extract the filters if any
        const { page=1, pageSize=20, sort=null, search="" } = req.query;

        // ? Format the sort for mongodb
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field] : (sortParsed.sort = 'asc' ? 1 : -1)
            }
            return sortFormatted;
        }

        const sortFormatted = Boolean(sort) ?generateSort() : {};

        // ? Call the query to fetch transactions
        const transactions = await Transaction.find({
            $or: [
                { cost : {$regex: new RegExp(search, "i")}},
                { userId: { $regex: new RegExp(search, "i")}}
            ]

        })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize)

        // ? Call the query to fetch number of documents
        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: "i"}
        })

        res.status(200).json({
            transactions,
            total
        });

    }catch(error){
        res.status(404).json({ message: error.message})
    }
}

exports.getGeography= async (req, res) => {
    try{
        const users = await User.find({ role: 'user'}).select("-password");

        const mappedLocations = users.reduce((acc, { country}) => {
            // ? using package countryISO-2-to-3 because in our database country is saved in 2 character 
            // ? but out nevo map library required data in 3 character

            let countryISO3 = getCountryISO3(country);     
            if(!acc[countryISO3]){
                acc[countryISO3] = 0;
            } 
            acc[countryISO3]++;
            return acc;
        }, {});

        // ? final format as nevo library required to render on map
        const formatedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count}
            }
        )

        res.status(200).json(formatedLocations);

    }catch(error){
        res.status(404).json({ message: error.message})
    }
}