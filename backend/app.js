const express = require('express');
const connectDatabase = require('./config/connectDatabase');
const app = express();
const dotenv=require('dotenv');

//configuring enviroment variables
dotenv.config({path:'./backend/config/config.env'});

app.use(express.json());
// console.log("app");
connectDatabase();

//import all routes
const products =require('./routes/product');
app.use('/api/v1',products);

// app.get('/',(req,res)=>{
// res.json({mm:"kkkk"});
// })
module.exports=app;