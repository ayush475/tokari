const ErrorHandler = require("../utils/errorHandler");


// module.exports = func =>(req,res,next)=>{
//    console.log("ll");
//   return  Promise.resolve(func(req,res,next))
// .catch(err=>{
//     console.log(err.name);
//    throw next(new ErrorHandler(err.name,500));
// });
// } 

//this is good 
module.exports = func => (req, res, next) =>{
  console.log("async");
  return  Promise.resolve(func(req, res, next))
        .catch(next);
}