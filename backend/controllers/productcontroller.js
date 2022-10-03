//const Product = require("../models/product");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures =require('../utils/apiFeatures');

//create new products and test in api
exports.newproduct = catchAsyncErrors(async (req, res, next) => {
  //user  lai add gareko
  req.body.user =req.user.id;
  
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// using try catch
exports.createnewproductwithtry = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      throw err;
    }
    return res.status(201).json({
      success: true,
      product,
    });
  } 
  catch (err) {
    console.log(err);
    return err;
  }
});

// using promise
exports.createnewproduct = (req, res, next) => {
  Product.create(req.body)
    .then((product) => {
      res.status(201).json({
        success: true,
        product,
      });
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

exports.getproducts = catchAsyncErrors(async (req, res, next) => {

  const resPerPage =5;
  //productcount is to be used in  frontend
  //remember this please
  
  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(),req.query)
 //implementing search , filter and pagination 
 //i don't know much about  pagenation but hope this works
 // this code  is working as  required on  friday 30 september 2022 10:58 PM
  .search() .filter() .pagination(resPerPage)
          const Products = await apiFeatures.query;
  console.log("done");
  res.status(200).json({
    success: true,
    count: Products.length,
    message: "this route  shows all  products in database",
    Products,
  });
});
//now to get single products
//using the product id
//just testing new features
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  /* if(!product){
   // return res.status(404).json({
   //   success :false,
     // message:"product not found"

    //}
    //)
    return next(new ErrorHandler('product not found',404));
       }*/

  console.log(!product);
  if (!product) {
    console.log("produ");
    return next(new ErrorHandler("product not found",404));
  }

  return res.status(200).json({
    success: true,
    message: "product found and the details are :",
    product,
  });
  //}
});

//now to update products from admin
//this might need to be updated later
//generic features of e-commerce websites
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    /*return res.status(404).json({
      success :false,
      message:"product not found"

    })
    */
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    UseFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});
// now deleting product
//admin routes
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));

    /*return res.status(404).json({
      success :false,
      message:"product not found"

    }) */
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});
