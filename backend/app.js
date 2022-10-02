const express = require('express');
const connectDatabase = require('./config/connectDatabase');
const app = express();
const dotenv=require('dotenv');
const morgan=require('morgan');
const errorMiddleware =require('./middlewares/errors');
const cookieParser = require('cookie-parser')

//now use cookie-parser
//remember to use express.json()  before cookieparser
//this is the rule
app.use(express.json());
app.use(cookieParser());

//configuring enviroment variables
dotenv.config({path:'./backend/config/config.env'});

// dev dependencies 
app.use(morgan('tiny'));



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





module.exports=app;