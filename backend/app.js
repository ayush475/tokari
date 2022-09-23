const express = require('express')
const app = express();

app.use(express.json());
// console.log("app");

//import all routes
const products =require('./routes/product');
app.use('/',products);

// app.get('/',(req,res)=>{
// res.json({mm:"kkkk"});
// })
module.exports=app;