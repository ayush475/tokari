const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
    err.statusCode = err.statuscode || 500;
    err.message = err.message || "internal server error";
  
  
   // console.log(  err.name,"mmmmmm");
    // handling typecast error(mongodb _id error)
    if(err.name=='CastError'){
      const message=" Not found.Invalid _id"
       err=new ErrorHandler(400,message);
    }
  
    //MongoServerError(duplicate key error /email)
    if(err.name=='MongoServerError'){
      //  console.log("true");
        const message="Email already exist"
         err=new ErrorHandler(400,message);
      }
  
  
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    next();
  };