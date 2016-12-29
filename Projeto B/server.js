require('dotenv').config()
var express = require('express')
var url = require('url')
var isearch = require('node-google-image-search')
var app = express()
var mongo = require('mongodb').MongoClient

app.get('/api/imagesearch/:input', function(req, res){
	var input = req.params.input
	var offset = req.query.offset
	var counter = 0
	var array = []

	mongo.connect('mongodb://localhost:27017', function(err,db){
		if(err) throw err
		var coll = db.collection('history')
		coll.insert({'term':input, 'when': new Date()}, function(err,data){
			if(err) throw err
		})
	})

	isearch(input, function(images){
		/*Just if i want just the img url.:

			for(var i  = 0; i < 10; i++){
			array[i] = images[i].link
		}*/
		res.send(images)
	},offset,10)

})

app.get('/api/latest/imagesearch/', function(req, res){
	mongo.connect('mongodb://localhost:27017', function(err,db){
		if(err) throw err
		var coll = db.collection('history')
		coll.find({},{'term':1, 'when':1, _id:0}).toArray(function(err, array){
			if(err) throw err
			res.send(array)
		})
	})

})

app.listen(6979, function(){
	console.log('Lançando servidor...')
})
