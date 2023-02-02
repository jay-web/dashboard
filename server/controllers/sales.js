const OverallStat = require("../models/OverallStat");


exports.getSales = async (req, res) => {
    try{
        const overallStat = await OverallStat.find();
        
        res.status(200).json(overallStat[0])

    }catch(error){
        res.status(404).json({message: error.message});
    }
}