var app = require('./app');
//defined server
const server = app.listen(process.env.PORT, function(err){
	if (err) console.log("Error in server setup")
	console.log("Server listening on Port",process.env.PORT);
})
process.on('unhandledRejection',err=>{
	
	console.log('ERROR :'+err.message);//choose this for short info
	console.log('ERROR :'+err.stack);// choose this for complete  error info
	console.log(' shutting down server because unable to  handle promises rejections');
	server.close(()=>{
		process.exit(1);
	})

})
//handle uncaught exceptions
//probably need to change this later
//oh god i hope this works

process.on('uncaughtException',err=>{
	console.log('Error:'+err.message);//choose this for short info
	console.log('ERROR :'+err.stack); // choose this for complete  error info
	console.log("shutting down server due to uncaught exception");
	process.exit(1)
})
//
//console.log(a);// is a test for uncaught reference
