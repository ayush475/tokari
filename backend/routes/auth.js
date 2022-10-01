const express = require('express');
const router = express.Router();
const {
    //if any new route is  made then add  here 
    registerUser, loginUser}=require('../controllers/authController')
    router.route('/register').post(registerUser);
    //login http://localhost:4000/login
    //api ma add garxu
    router.route('/login').post(loginUser);




    module.exports = router;   