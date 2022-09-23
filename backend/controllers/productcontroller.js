exports.getproducts=(req,res,next)=>{
    console.log("done");
    res.status(200).json({
        success:true,
        message:'this route is for testing purpose only'
    })
}