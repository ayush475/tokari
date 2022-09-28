const express =require('express')
const router = express.Router();


const{getproducts, newproduct,getSingleProduct}=require('../controllers/productcontroller')


router.route('/products').get(getproducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/new').post(newproduct);


router.get('/products',getproducts);

module.exports=router;

