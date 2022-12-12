


const ErrorResponse = require("../utlis/errorResponse");

const errorHandler =(err, req,res, next)=>{
    let error = {...err};
    error.message = err.message

    console.log(err)

    // in mongoose 1100 means duplicate error key;
    if(err.code === 1100){
        const message = `Duplicate field value entered`;
        error = new ErrorResponse(message, 400)
    }


    //mongoose validation error called  validationError
    if(err.name === "validationError"){
        const message = Object.values(err.errors).map((val)=> val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success : false,
        message : error.message || `Server Error`
    })


}
module.exports = errorHandler;