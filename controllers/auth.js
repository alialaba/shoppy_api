const User = require("../models/userModel");

const ErrorResponse = require("../utlis/errorResponse")

exports.signup  = async (req,res,next)=>{

const {firstname, lastname, username, password, email} =  req.body;

try {
    const user = await User.create({firstname, lastname, username, password, email});

    return res.status(201).json({success: true, user:user });
} catch (error) {
    next(error);
}

}

exports.login = async (req,res,next)=>{
   const {email, password} = req.body;

   //check whether email || password is provided by user

   if(!email || !password){
    // res.status(400).json({success: false, error:"Please provide email and password"});

    return next(new ErrorResponse("Please provide email and password" , 400))
   }

   try {
    const user = await User.findOne({email}).select("+password");

    if(!user){
        // res.status(404).json({success: false, error: "Invalid creditials"})
        return next(new ErrorResponse("Invalid creditials" , 401))
    }
    
    const isMatch = await user.isValidPassword(password);

    if(!isMatch){
        // res.status(404).json({success: false, error: "Invalid creditials"})
        return next(new ErrorResponse("Invalid creditials", 401))
    }
    
    res.status(200).json({ success: true, token: "rhety4hbnbewbwvbwm"})
   } catch (error) {
    // res.status(500).json({success: false, error: error.message})
    next(error)
   }

}
   
exports.forgotpassword = (req,res,next)=>{
    res.send("forgotpassword route");
}

exports.resetpassword = (req,res,next)=>{
    res.send("resetpassword route")
}