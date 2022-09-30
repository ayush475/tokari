const ErrorHandler =require('../utils/errorHandler');

module.exports =(err,req,res,next)=>{
    console.log("fkfkfkfkkfkf");
    err.statusCode = err.statusCode || 500;
    //statuscode 500 => internal server error 
    //err.message= err.message || ' 500 internal server error';
    console.log("ddddddddddddddd");
    if (process.env.NODE_ENV ==='DEVELOPMENT'){

        if (err.name ==="CastError"){
            console.log("done");
            const message ="resource not found . invalid "+err.path

            err = new ErrorHandler(message,400)
        }

        res.status(err.statusCode).json({
            success:false,
           err,
            stack :err.stack
        })
    }
    //if we set the process to production
    if (process.env.NODE_ENV ==='PRODUCTION'){
        let err ={ ...err}
        err.message = err.message;
        //mongodb error checker
        //hope it works
        //wrong db ID
        
        if (err.name ==="CastError"){
            console.log("done");
            const message ="resource not found . invalid "+err.path

            err = new ErrorHandler(message,400)
        }


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