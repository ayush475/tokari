const product = require('../models/product');
const dotenv = require ('dotenv');
const connectDatabase = require('../config/connectDatabase');
const products =require('../data/product');

dotenv.config({
    path:'backend/config/config.env'
});
connectDatabase();
//maybe this needs to be changed later
//might consider changing
// if things doesn't  work according 

const seedProducts = async () =>{
    try{
        await product.deleteMany();
        console.log('testing  1 ok');
        await product.insertMany(products);
        console.log(' test 2 ok')
        process.exit();
 }
    catch(error){
        console.error(error.message);
    process.exit();
    }
}

seedProducts();
