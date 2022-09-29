const ErrorHandler =require('../utils/errorHandler');

module.exports =(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    //statuscode 500 => internal server error 
    //err.message= err.message || ' 500 internal server error';
    if (process.env.NODE_ENV ==='DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage:err.message,
            stack :err.stack
        })
    }
    //if we set the process to production
    if (process.env.NODE_ENV ==='PRODUCTION'){
        let error ={...err}
        error.message=err.message

        res.status(err.statusCode).json({
            success:false,
            //error:err,
            message:error.message || "internal server error 500",
            stack :err.stack
        })
    }
    /*res.status(err.statusCode).json({
        success: false,
        error:err.stack
    })*/

}