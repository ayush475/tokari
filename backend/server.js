var app = require('./app');

app.listen(process.env.PORT, function(err){
	if (err) console.log("Error in server setup")
	console.log("Server listening on Port",process.env.PORT);
})