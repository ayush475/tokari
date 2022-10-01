const express = require('express');
const connectDatabase = require('./config/connectDatabase');
const app = express();
const dotenv=require('dotenv');
const morgan=require('morgan');
const errorMiddleware =require('./middlewares/errors')


//configuring enviroment variables
dotenv.config({path:'./backend/config/config.env'});

// dev dependencies 
app.use(morgan('tiny'));


app.use(express.json());
// console.log("app");
connectDatabase();

//import all routes
const productRoutes =require('./routes/product');
//for auth
const auth = require('./routes/auth');


app.use('/',productRoutes);
app.use('/', auth);

//errorhandler ko lagi
app.use(errorMiddleware);


// app.get('/',(req,res)=>{
// res.json({mm:"kkkk"});
// })
module.exports=app;