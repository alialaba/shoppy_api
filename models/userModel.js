const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname:{
        type: String,
        required: true
    }, 
    lastname:{
        type: String,
        required:true
    },
    username:{
        type:String,
        required:[true, "Please provide a Username"]
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minLength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpired: string

       
    
})


const User = mongoose.model("users", UserSchema)

module.exports = User;