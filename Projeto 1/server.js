var express = require('express')
//var bp = require('body-parser')
var app = express()

app.use(express.static('firstpage'))

app.get('/', function (req,res){
    res.sendFile('index.html')
})

app.get('/:input', function(req,res){
    var input = req.params.input
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var result = {"unix" : "Invalid", "natural" : "Invalid"}
    if(isNaN(input)){
        var date = new Date(input)
        if (date != 'Invalid Date'){
            result = {"unix" : Date.parse(input)/1000, "natural" : input}
        }
    }else{
        var date = new Date(input*1000)
        result = {"unix" : date.getTime(), "natural" : month[date.getMonth()] +" "+ date.getDay()+", "+ date.getFullYear()}
    }
    res.send(result)
})



app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
