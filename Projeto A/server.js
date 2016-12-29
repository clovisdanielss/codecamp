var express = require('express');
var mongo = require('mongodb').MongoClient
app = express();

app.use(express.static('home'))

app.get('/', function(req, res){
	res.sendFile('index.html')
})

app.get('/new/https://:url', function(req,res){
	var weburl = req.params.url
	mongo.connect('mongodb://localhost:27017', function(err,db){
		if(err) throw err
		var coll = db.collection('websites')
		
		coll.count(function(err, count){
			console.log(count)
			counter = count
			coll.insert({site_origin:'https://' + weburl, site_id: counter.toString()},function(err,data){
				if(err) throw err
				res.send(JSON.stringify({site_origin:weburl,site_min:'localhost:6979/page/'+counter}))
			})
			coll.find({}).toArray(function (err,doc){
				if(err) console.log(err)
				console.log(doc)
			})
		})
		
	})
})

app.get('/page/:input',function(req, res){
	var input = req.params.input
	mongo.connect('mongodb://localhost:27017', function(err,db){
		var coll = db.collection('websites')
		coll.find({site_id:input}).toArray(function (err,doc){
				if(err) console.log(err)
				res.redirect(doc[0].site_origin)
			})
	})

})

app.get('/erase', function(req,res){
	var weburl = req.params.weburl
	mongo.connect('mongodb://localhost:27017', function(err,db){
		if(err) throw err
		var coll = db.collection('websites')
		coll.remove({})
		coll.count(function(err, count){
			console.log(count)
		})
	})
})

app.get('/*:input', function(req, res){
	var input = req.params.input
	if(input.toString() == "index2")
		res.sendFile(__dirname + '/home/index2.html')
	else
		res.sendFile(__dirname + '/error/erro.html')
})

app.listen(process.env.PORT || 6979,'localhost', function(){
	console.log('Lançando servidor...')
});
