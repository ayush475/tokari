const ErrorHandler =require('../utils/errorHandler');

module.exports =(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    //statuscode 500 => internal server error 
    err.message= err.message || ' 500 internal server error';

    res.status(err.statusCode).json({
        success: false,
        error:err.stack
    })

}