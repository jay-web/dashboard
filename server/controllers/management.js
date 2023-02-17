
const User = require("../models/User");

export const getAdmin = async (req, res) => {
    try{
        const admin = await User.find({ role: 'admin'}).select("-password")

    }catch(error){
        res.status(404).json({message: error.message});
    }
}