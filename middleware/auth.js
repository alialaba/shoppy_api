const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const ErrorResponse = require("../utlis/errorResponse")

//1. check if the req.heder statswith Bearer and split the second element
//2. check if no token error not authorized this route 401;
//3. var decode jwt.verify(token, jwt_secret) and findbyid 
//4. check if user not exist return error no user found 404 and set req.user to user then next after then error 401
exports.protect = async (req,res, next)=>{
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return next(new ErrorResponse(" Not authorized to access this route", 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = User.findById(decoded.id);

        if(!user){
            return next(new ErrorResponse(" No user found with this id", 404))
        }
        req.user = user;
        next()
    } catch (error) {
        return next(new ErrorResponse(" Not authorized to access this route", 401))
    }
}