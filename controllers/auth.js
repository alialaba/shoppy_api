const crypto = require("crypto");
const User = require("../models/userModel");

const ErrorResponse = require("../utlis/errorResponse");

const sendEmail = require("../utlis/sendEmail")



/********************/
/*SIGNUP SECTION  LOGIN*/
/********************/

exports.signup  = async (req,res,next)=>{

const {firstname, lastname, username, password, email} =  req.body;

try {
    const user = await User.create({firstname, lastname, username, password, email});
    //refactor code because is same with login response but different status code
    // return res.status(201).json({success: true, token:"3u481929ser" });
    sendToken(user, 201, res);
} catch (error) {
    next(error);
}

}



/********************/
/*LOGIN SECTION LoGIN */
/********************/
exports.login = async (req,res,next)=>{
   const {email, password} = req.body;

   //check whether email || password is provided by user

   if(!email || !password){
    // res.status(400).json({success: false, error:"Please provide email and password"});

    return next(new ErrorResponse("Please provide email and password" , 400))
   }

   try {

    // Check that user exists by email
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
     //refactor code because is same with login response but different status code
    // res.status(200).json({ success: true, token: "rhety4hbnbewbwvbwm"})
    sendToken(user, 200, res)
   } catch (error) {
    // res.status(500).json({success: false, error: error.message})
    next(error)
   }

}

/********************/
/*FORGET PASSWORD SECTION */
/********************/
exports.forgotpassword = async (req,res,next)=>{
   const {email} = req.body;

   try {
    const user = await User.findOne({email});

    console.log(user)
   if(!user){
    return next(new ErrorResponse("Email could not be sent", 404));
   }

    // Reset Token Gen and add to database hashed (private) version of token
   const resetToken = user.getResetPasswordToken();

     await user.save()

     // Create reset url to email to provided email
     const resetUrl = `http://localhost:3000/passwordreset/${resetToken}` ;
     const message =`

     <div style="text-align:center; border:1px solid #ccc; border-radius:6px;padding:10px;">
     <h2>You request to reset your password</h2>
     <p>Click on the link below to reset password</p>
     <a style="background: blue; color:#fff; text-decoration: none; padding:15px 30px; " href=${resetUrl} clicktracking=off>Reset</a>

     
     </div>
         `
    try {
    
        await sendEmail({
            to: user.email,
            subject: "Reset Password",
            text : message
        })
        res.status(200).json({success: true , data:"Email sent"})
    } catch (error) {
        console.log(error)
        user.resetPasswordToken = undefined
        user.resetPasswordExpired = undefined

        await user.save();

        return next(new ErrorResponse("Email could  not be sent",500 ))
       }


   } catch (error) {
    return next(error)
   }

}


/********************/
/*RESET PASSWORD SECTION */
/********************/
exports.resetpassword = async (req,res,next)=>{
 // Compare token in URL params to hashed token
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

  try {
    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpired:{$gt: Date.now()} //create than current time
    })

    //if user with resettoken not found is not find
    if(!user){
        return next(new ErrorResponse("Invalid Reset Password", 400))
    }

    //set user password to newly requested password
    user.password = req.body.password

    //both resetPasswordToken & resetPasswordExpired is set to undefined because they have been used;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;

    await user.save()


    res.status(201).json({
        success:true,
        data:"Password rest successfully"
    });

  } catch (error) {
    next(error);
  }

}


/********************/
/*TOKEN GENRATORs SECTION */
/********************/
const sendToken = (user,statusCode,res )=>{
    //user : holds email & password: and generate token for the user
    const token = user.getSignedToken();
   res.status(statusCode).json({success:true, token})

}

/* generate token with this */
// 1. run node
// 2. run require("crypto").randomBytes(35).toString("hex").