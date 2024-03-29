const ErrorHandler = require('../utils/errorhandler');
module.exports = (err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    // Wrong mongodb id error
    if(err.name === "CastError")
    {
        const message = `Resource not found Invalid : ${err.path}`;
        err=new ErrorHandler(message,400)
    }

    // Mongoose duplicate key error
    if(err.code === 11000){
        const message=`This ${Object.keys(err.keyValue)} already exists `
        err = new ErrorHandler(message,400);
    }

     // JWT Token error
     if(err.name === "JsonWebTokenError")
     {
         const message = `Json web Token is Invalid , Try again`;
         err=new ErrorHandler(message,400)
     }


     // JWT Expire error
     if(err.name === "TokenExpiredError")
     {
         const message = `Json web Token is Expired , Try again`;
         err=new ErrorHandler(message,400)
     }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}