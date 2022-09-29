var app = require('./app');

app.listen(process.env.PORT, function(err){
	if (err) console.log("Error in server setup")
	console.log("Server listening on Port",process.env.PORT);
})
process.on('unhandledRejection',err=>{
	
	console.log('ERROR :'+err.message);
	console.log(' shutting down server because unable  handle promises rejections');
	Server.close(()=>{
		process.exit(1);
	})

})
