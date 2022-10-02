const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
const { name, email, password } = req.body
const user = await User.create({
    name,
    email,
    password,
    /*
    avatar: {
        public_id: '',
        url: ''
    }
    */
})
sendToken(user,200,res);
/*const token = user.getJwtToken();
res.status(201).json({
    success:true,
    token
})*/
})
//http://localhost:4000/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

   //if not correct request
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    //400 => bad request

    // Finding user in database
    //now we need to find the user
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
      

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
 //now define the function in  user.js
    // function defined
    //now check
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res)
     /*const token =user.getJwtToken();
    res.status(200).json({
        success:true,
        token
    })*/
})
exports.logout=catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"user logged-out successfully"
    })
})

