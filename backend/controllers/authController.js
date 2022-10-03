const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto =require('crypto');
const bcrypt=require('bcryptjs');
const { send } = require('process');

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
        //to check if the code is working or not
    // console.log("Ayush don");
       
        return next(new ErrorHandler('user doesnot exist', 401));
    }
      

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
 //now define the function in  user.js
    // function defined
    //now check
    if (!isPasswordMatched) {
        //console.log("dddd5555");
        return next(new ErrorHandler('Invalid Email or Password', 402));
    }

    sendToken(user, 200, res)
     /*const token =user.getJwtToken();
    res.status(200).json({
        success:true,
        token
    })*/
})
//forgot password wala section ho yo chai
//http://localhost:4000/password/forget
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Tokari Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }

})
//finished this section of code
//reset ko lagi http://localhost:4000/password/reset
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }//ajako date vanda ta badi huna parxa 
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})
//currently logged in vako user ko profile herna
//http://localhost:4000/me
exports.getUserProfile =catchAsyncErrors(async(req,res,next)=>{
    const user =await User.findById(req.user.id)
    //to test
    console.log(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})
//user le aafi password update garna milxa


  exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    const user = await User.findById(req.user.id).select('+password');

    // Check old password
    const oldPassword =req.body.oldPassword
   
    const isTrue = await user.comparePassword(oldPassword)
    console.log(user);
    if (!isTrue) {
        console.log('test2');
        return next(new ErrorHandler('Old password is incorrect',400));
    }
    console.log('test3')

    user.password = req.body.newpassword;
    console.log('test4');
    await user.save();
    console.log('test5');
    sendToken(user, 200, res);
    next()

})
//protip : sometimes changing variables can make   things work
//updating uer profile is required too
exports.updateProfile =catchAsyncErrors(async(req,res,next)=>{
    const newUserData ={
        name:req.body.name,
        email:req.body.email
    }
    const user= await User.findByIdAndUpdate(req.user.id , newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    })
    res.status(200).json({
        success:true,
        message:"user info updated"
    })
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
//let's find the total number of users
//let's make this route only accessible to admins
//http://localhost:4000/admin/allusers
exports.allUsers=catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
})
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
    }
    await user.remove();

    res.status(200).json({
        success: true,
        
    })
})
exports.updateUser =catchAsyncErrors(async(req,res,next)=>{
    const newUserData ={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
    const user= await User.findByIdAndUpdate(req.params.id , newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:true
    })
    res.status(200).json({
        success:true,
        message:"user info updated"
    })
})

//let's  give the admin permisiion to delete the user
