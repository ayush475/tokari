const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


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
const token = user.getJwtToken();
res.status(201).json({
    success:true,
    token
})
})
//http://localhost:4000/login
exports.loginUser =catchAsyncErrors(async(req,res,next)=>{
    const{
        email,
        password
    }=req.body;
    //if not correct request
    if(!email || !password){
        return next(new ErrorHandler('please enter the full details',400))
        //400 => bad request
    }
    //now we need to find the user
    const user = await User.findOne({email}).select('+password') 
    if(!user){
        return(new ErrorHandler('invalid email   or password',401));
    }
    //now let's check if the paswsword is correct or not
    const isPasswordMatched =await user.comparePassword(password);
    //now define the function in  user.js
    // function defined
    //now check
    if(!isPasswordMatched){
        return(new ErrorHandler('invalid email || password',401));
    }
    const token =user.getJwtToken();
    res.status(200).json({
        success:true,
        token
    })
})