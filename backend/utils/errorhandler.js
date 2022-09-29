//error handler class
//use  capital letter at beginning
// i am very bad at commenting code so please neglect it
class ErrorHandler extends Error{
    constructor(message,errorCode){
        super(message);
    this.statusCode =statusCode;
    Error.captureStackTrace(this , this.constructor)
    }

}

//export the error handler
module.exports =ErrorHandler;