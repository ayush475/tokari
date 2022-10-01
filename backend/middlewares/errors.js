const ErrorHandler =require('../utils/errorHandler');

module.exports =(err,req,res,next)=>{
   // console.log("fkfkfkfkkfkf");
    err.statusCode = err.statusCode || 500;
    //statuscode 500 => internal server error 
    //err.message= err.message || ' 500 internal server error';
    //console.log("ddddddddddddddd");
    if (process.env.NODE_ENV ==='DEVELOPMENT'){
        console.log(err);

        if (err.name ==="CastError"){
           // console.log("done");
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
        let error ={ ...err}
        err.message = err.message;
        //mongodb error checker
        //hope it works
        //wrong db ID
        
        if (err.name ==="CastError"){
           // console.log("done");
            const message ="resource not found . invalid "+err.path

            err = new ErrorHandler(message,400)
        }
        //type-error still exists
        //need to update that in later 
        //jagadish bro le  update garxa natra ma aafai garchu
        //now  handling validation error
        if (err.name ==="ValidationErrorrs"){
            const message = Object.values(err.errors).map(value=>
                value.message);
            error = new ErrorHandler(message,400)
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