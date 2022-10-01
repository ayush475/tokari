//const { options } = require("../routes/auth");

// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res) => {

    // Create Jwt token
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        //cookie ko setup teti aayena
        expires:new Date(Date.now() + (process.env.COOKIE_EXPIRES_TIME*24*3600*1000)),
        /*expires: new Date(
            Date.now() + (process.env.COOKIE_EXPIRES_TIME*10 * 24 * 60 * 60 * 1000)
        ),
        */
        httpOnly: true    //can only be accessed by browser only
    }


    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })

}

module.exports = sendToken;