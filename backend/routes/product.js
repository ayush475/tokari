const express =require('express')
const router = express.Router();


const{
    getproducts, newproduct,getSingleProduct,updateProduct,deleteProduct
}=require('../controllers/productcontroller')

const{ isAuthenticatedUser,authorizeRoles }=require('../middlewares/auth');


router.route('/products').get(authorizeRoles("admin"),getproducts);// if we add isAuthenticated here only logged in users can get the result , let's not make that
router.route('/product/:id').get(getSingleProduct);
//only authenticated can post and put
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles("admin"),newproduct);
router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
// we can keep the .delete  combined with update product too

router.route('/admin/product/:id').delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);




router.get('/products',getproducts);

module.exports=router;

