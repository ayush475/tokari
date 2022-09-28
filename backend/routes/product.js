const express =require('express')
const router = express.Router();


const{getproducts, newproduct,getSingleProduct,updateProduct}=require('../controllers/productcontroller')


router.route('/products').get(getproducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/admin/product/new').post(newproduct);
router.route('/admin/product/:id').put(updateProduct)


router.get('/products',getproducts);

module.exports=router;

