const express =require('express')
const router = express.Router();


const{
    getproducts, newproduct,getSingleProduct,updateProduct,deleteProduct, createProductReview, getProductReviews, deleteReview
}=require('../controllers/productcontroller')

const{ isAuthenticatedUser,authorizeRoles }=require('../middlewares/auth');


router.route('/products').get(isAuthenticatedUser,getproducts);// if we add isAuthenticated here only logged in users can get the result , let's not make that
router.route('/product/:id').get(getSingleProduct);
//only authenticated can post and put
router.route('/admin/product/new').post(isAuthenticatedUser,newproduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
// we can keep the .delete  combined with update product too

router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.route('/review').put(isAuthenticatedUser,createProductReview);
router.route('/reviews').get(isAuthenticatedUser,getProductReviews);
router.route('/reviews').delete(isAuthenticatedUser,deleteReview);




module.exports=router;

