var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req,res){
	res.writeHead(200,{"Content-Type":"text/html"})
	if(req.url == '/')
		fs.readFile('./home/index.html', function(err,data){
			if(err) console.log("Problem on readFile")
			res.write(data)
			res.end()
		})
	else if(req.url == '/contacts')
		fs.readFile('./home/contacts.html', function(err,data){
			if(err) console.log("Problem on readFile")
			res.write(data)
			res.end()
		})
	else{ 
		res.write('<h1>Page not found</h1>')
		res.end()
	}

})

server.listen(6979, function(){
	console.log("Aula 4 rodando ...")
})