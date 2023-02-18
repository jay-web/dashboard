
const mongoose = require("mongoose");
const User = require("../models/User");
const Transaction = require("../models/Transaction");


exports.getAdmins = async (req, res) => {
    try{
        const admin = await User.find({ role: 'admin'}).select("-password");

        res.status(200).json(admin);

    }catch(error){
        res.status(404).json({message: error.message});
    }
}

exports.getUserPerformance = async (req, res) => {
    try {
         const {id } = req.params;

         const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id)}},
            { $lookup: {
                from: 'affiliatestats' ,     // ? table name
                localField: "_id",
                foreignField: "userId",
                as: "affiliateStats"
                }
            },
            { $unwind: "$affiliateStats"}
         ]);

         const salesTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id);
            })
         );

         const filteredSalesTransaction = salesTransactions.filter(
            (transaction) => transaction !== null
         );


         res.status(200).json({ user: userWithStats[0], sales: filteredSalesTransaction } );

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}