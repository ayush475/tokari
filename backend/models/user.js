const mongoose =  require('mongoose');
const validator = require('validator');
//importing bcrypt
const bcrypt =require('bcryptjs');
//importing jason web token 
const jwt =require('jsonwebtoken');
//for password token
const crypto =require('crypto');
//const catchAsyncErrors = require('../middlewares/catchAsyncErrors');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    /*avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
      
    },  */ 
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})
//since password is saved as string
//which is a dumb  idea 
// so we need to encrypt it before saving
// i am so smart
//lol 
//so let's do that 
//quickly 😭😭😭😭😭😭😭😭
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

//password check garni 
//hash value wala
userSchema.methods.comparePassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.getJwtToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    //password reset  ko token ....crypto le dinxa
//so let's decide a function
    const resetToken = crypto.randomBytes(20).toString('hex');
//now secons step
    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //we need to set token expiry time
//ahh smart 
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}




module.exports = mongoose.model('User', userSchema);