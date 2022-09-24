//const product = require('../models/product');
const product =require('../models/product')

//create new products and test in api
exports.newproduct = async(req,res,next)=>{
    const product =await product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}




exports.getproducts=(req,res,next)=>{
    console.log("done");
    res.status(200).json({
        success:true,
        message:'this route is for testing purpose only'
    })
}

