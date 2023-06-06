const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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
    resetPasswordExpired: Date
})



// The code in the UserScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// you will get the plain text password, hash it, and store it.
// UserSchema.pre(
//     'save',
//     async function (next) {
//         const user = this;
//         const hash = await bcrypt.hash(this.password, 10);

//         this.password = hash;
//         next();
//     }
// );


UserSchema.pre("save", async function (next){
    if (!this.isModified("password")) {
        next();
      }
    
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
})

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }


//you will need token to get signed in.
UserSchema.methods.getSignedToken = function(){
//jwt: accept payload && secretOrprivatekey && options
 return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

UserSchema.methods.getResetPasswordToken = function(){

  const resetToken =  crypto.randomBytes(20).toString("hex");

   // Hash token (private key) and save to database
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpired = Date.now() + 10 * (60 * 1000) //expires in 10min
  return resetToken

}

const User = mongoose.model("Users", UserSchema);

module.exports = User;