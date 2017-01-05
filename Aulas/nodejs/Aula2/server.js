var http = require('http')

var server = http.createServer(function(req, res){
	// Definindo tipo do conteudo enviado.
	res.writeHead(200,{"Content-Type" : "text/html"})
	if(req.url == '/'){
		res.write("<h1> Main Page </h1>")	
	}
	else	if(req.url == '/clients'){
		res.write("<h1> Client Page </h1>")
	}
	else{
		res.write("<h1> Error 404, Page not found! </h1>")
	}
	res.end()
})

server.listen(6979, function(){
	console.log("Aula 2 rodando...")
})
