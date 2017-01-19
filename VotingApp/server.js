var app = require('./app')

app.listen(app.get('port'), function(){
	console.log("Listening on " + app.get('port'))
})
