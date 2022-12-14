const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser
} = require('../controllers/authController');
//isauthenticated le garda  safe hunxa 
//so
const{isAuthenticatedUser,authorizeRoles}=require('../middlewares/auth')
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword); 
router.route('/password/reset/:token').put(resetPassword); 
router.route('/password/update').put(isAuthenticatedUser,updatePassword); 
router.route('/me').get(isAuthenticatedUser,getUserProfile); 
router.route('/me/update').put(isAuthenticatedUser,updateProfile);
router.route('/admin/allusers').get(isAuthenticatedUser,allUsers); 
router.route('/admin/user/:id').get(isAuthenticatedUser,getUserDetails); 
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateUser); 
router.route('/admin/user/:id').delete(isAuthenticatedUser,deleteUser); 


module.exports = router;   