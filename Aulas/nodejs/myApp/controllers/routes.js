var express = require('express');
var router = express.Router();
var user = require('../models/user')

/* GET home page. */
router.get('/home', function(req, res) {
  res.render('./home/home');
});

router.get('/', function(req, res) {
  res.render('index', {title:"APP"});
});

router.get('/users', function(req, res) {
  user.find(function(err,users){
  	if(err) throw err
   res.render('./users/index', {list:users});
  })

});

router.get('/clients', function(req, res) {
  res.render('index', {title:"APP"});
});

router.get('/contact', function(req, res) {
	user.find(function(err,user){
  	if(err) throw err
  	res.json(user)
  })
});

router.get('/users/singup', function(req, res) {
  res.render('./users/singup');
});

router.post('/users/singup',function(req,res){
	var model = new user(req.body)
	model.save(function(err){
		if(err) throw err
		res.redirect('/users')
	})

})

router.get('/users/singin', function(req,res){
  res.render('./users/singin')
})

router.post('/users/singin', function(req,res){
  var login = req.body.login
  var password = req.body.password
  user.findOne({login:login}).exec(function(err,data){
    if(err) throw err
    if(data.password == password)
      console.log("logged")
  })
  res.redirect('/users')
})

router.get('/users/erase/:input', function(req,res){
  var input = req.params.input
  user.find({_id:input}).remove().exec()
  res.redirect('/users')
})

module.exports = router;
