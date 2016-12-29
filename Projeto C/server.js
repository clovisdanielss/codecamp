var express = require('express')
var app = express()
var busboy = require('connect-busboy')
var fs = require('fs')

app.use(busboy())

app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html')
})


app.post('/get-file-size', function(req,res){
//	var fstream
	req.pipe(req.busboy)
	req.busboy.on('file', function(fieldname, file, filename){
		file.on('data',function(data){
			res.send({size:data.length})
		})	
		/*fstream = fs.createWriteStream(__dirname + '/get-file-size/' + filename)
		file.pipe(fstream)
		fstream.on('close', function(){
			res.redirect('back')
		})*/
	})
})


app.listen(6979, function(){
	console.log("Servidor lançado...")
})

//Remova comentarios se quiser fazer o upload de um arquivo.
