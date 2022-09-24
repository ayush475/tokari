const express = require('express');
const connectDatabase = require('./config/connectDatabase');
const app = express();
const dotenv=require('dotenv');
const morgan=require('morgan');


//configuring enviroment variables
dotenv.config({path:'./backend/config/config.env'});

// dev dependencies 
app.use(morgan('tiny'));


app.use(express.json());
// console.log("app");
connectDatabase();

//import all routes
const productRoutes =require('./routes/product');
app.use('/',productRoutes);

// app.get('/',(req,res)=>{
// res.json({mm:"kkkk"});
// })
module.exports=app;