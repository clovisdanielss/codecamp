var mongoose = require('mongoose')
var Schema = mongoose.Schema

var user = new Schema({
	name: String,
	login: String,
	password: String,
	data_cad:{type: Date, default: Date.now}

})

module.exports = mongoose.model('users',user)