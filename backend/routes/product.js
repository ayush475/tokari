const express =require('express')
const router = express.Router();


const{
    getproducts, newproduct,getSingleProduct,updateProduct,deleteProduct
}=require('../controllers/productcontroller')

const{ isAuthenticatedUser }=require('../middlewares/auth');


router.route('/products').get(isAuthenticatedUser,getproducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(newproduct);
router.route('/admin/product/:id').put(updateProduct);
// we can keep the .delete  combined with update product too

router.route('/admin/product/:id').delete(deleteProduct);




router.get('/products',getproducts);

module.exports=router;

