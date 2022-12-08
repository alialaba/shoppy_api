const User = require("../models/userModel");

exports.signup  = async (req,res,next)=>{

const {firstname, lastname, username, password, email} =  req.body;

try {
    const user = await User.create({firstname, lastname, username, password, email});

    return res.status(201).json({success: true, user:user });
} catch (error) {
    
    return res.status(500).json({success:false, error: error.message});
}

}

exports.login = (req,res,next)=>{
    res.send("login  route");
}
   
exports.forgotpassword = (req,res,next)=>{
    res.send("forgotpassword route");
}

exports.resetpassword = (req,res,next)=>{
    res.send("resetpassword route")
}