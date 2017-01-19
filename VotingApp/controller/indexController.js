var model = require('../models/user')
var jwt = require('jsonwebtoken')
var config = require('../config')

exports.home = function(req, res) {
  res.render('index', { title: 'My Voting App' });
}
exports.default = function(req, res) {
  var clovis = new model({
  	name: 'Clovis Daniel',
  	password: 'senha',
  	admin: true
  })

  clovis.save(function(err){
  	if(err) console.log(err)
  	console.log('Sucess')
  	res.json({sucess:true})
  })
}
exports.show = function(req, res){
	model.find(function (err, users){
		if(err) console.log(err)
		res.render('showUsers', {list:users})
	})
}
exports.authenticate = function (req, res){
	model.findOne({name:req.params.name}, function (err, user){
		if(err) console.log(err)
		if(!user){
			res.json({sucess:false, mensage:"Authentication faiulre. Wrong user name", name: req.params.name})
		}else if(user){
			if(user.password != req.params.password){
				res.json({sucess:false, mensage:"Authentication faiulre. Wrong password", name: req.params.name})
			}else{

				var token = jwt.sign(user, config.secret ,{
					expiresIn: 60*60*24
				})
				res.json({
					sucess:true,
					mensage:'Enjoy',
					token:token
				})
			}
		}
	})
}