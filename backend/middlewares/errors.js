const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
    err.statusCode = err.statuscode || 500;
    err.message = err.message || "internal server error";
  
  
   // console.log(  err.name,"mmmmmm");
    // handling typecast error(mongodb _id error)
    if(err.name=='CastError'){
      const message=" Not found.Invalid _id"
       err=new ErrorHandler(message,400);
    }
  
    //MongoServerError(duplicate key error /email)
    if(err.name=='MongoServerError'){
      //  console.log("true");
        const message="Email already exist"
         err=new ErrorHandler(message,400);
      }
      if(err.name=='JsonWebTokenError'){
        //to test
        console.log("I am insider first   jwt token error");
        const message="!!!!!quick login can  solve this!!!!!!!!!"
        err=new ErrorHandler(message,400);
      }
      if(err.name=='TokenEXpiredError'){
        //to test
        console.log("I am inside second  jwt token error");
        const message="!!!!!token expired try again!!!!!!!!!!"
        err=new ErrorHandler(message,400);
      }
  
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    next();
  };