const express =require('express')
const router = express.Router();


const{getproducts, newproduct}=require('../controllers/productcontroller')


router.route('/products').get(getproducts);
router.route('/product/new').post(newproduct);


router.get('/products',getproducts);

module.exports=router;

