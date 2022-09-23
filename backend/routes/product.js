const express =require('express')
const router = express.Router();
const{getproducts}=require('../controllers/productcontroller')
router.route('/products').get(getproducts);

router.get('/products',getproducts);
module.exports=router;

