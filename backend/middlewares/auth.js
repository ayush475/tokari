

const User = require('../models/user');


const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {

    const { token } = req.cookies;
    console.log(token,"mmmmmmm");
     //console.log(`your required token is ${token}`);

    if (!token) {
        console.log("done");
        
        return next(new ErrorHandler('Login first to access this resource.', 401))
        /*The HyperText Transfer Protocol (HTTP) 401 Unauthorized response status code indicates
         that the client request has not been completed because it lacks valid authentication 
         credentials for the requested resource.
         */
    }
     //if there is any jwt expiry error then we need to manually suplly the token
    //first we login as a user
    //capture it's token and then  supply the token in postman Authorization /bearer-type
    //and it works
    // but need to work on this later on 
    // remember to work on this
try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET); 
    req.user = await User.findById(decoded.id);

    next()

} catch (err) {
    console.log(err);
    throw(err);
}
}
    
  

// Handling users roles
exports.authorizeRoles =(...roles)=>{
  
    return(req,res,next)=>{
        console.log(req.user);
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler("you can't access this",403))

        }
        next()


    }
}
