//let's check if our user is authorized or not
//let's create a function
//let's also import catchAsyncerrors
//const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors=require('./catchAsyncErrors');
const ErrorHandler = require("../utils/errorHandler");
const  jwt  = require('jsonwebtoken');
const user = require('../models/user');
//const User = require('../models/user');

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const {token } = req.cookies
    //console.log(`your required token is ${token}`);
    if(!token){
        return next(new ErrorHandler('login first to access the data',401))
        /*The HyperText Transfer Protocol (HTTP) 401 Unauthorized response status code indicates
         that the client request has not been completed because it lacks valid authentication 
         credentials for the requested resource.
         */
    }
    const decoded =jwt.verify(token,process.env.JWT_SECRET);
    req.user =await user.findById(decoded.id);
     next();

})