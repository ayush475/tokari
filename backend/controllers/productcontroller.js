//const product = require('../models/product');
const Product = require("../models/product");

//create new products and test in api
exports.newproduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// using try catch
exports.createnewproductwithtry = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      throw err;
    }
    return res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};

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
      throw err;
    });
};

exports.getproducts = (req, res, next) => {
  console.log("done");
  res.status(200).json({
    success: true,
    message: "this route is for testing purpose only",
  });
};
