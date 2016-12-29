var express = require('express')
var useragent = require('useragent')
useragent(true);
var app = express()
app.set('title','My Site')

app.use(express.static('things'))

app.get('/', function(req,res){
    var agent = useragent.parse(req.headers['user-agent'])
    res.send({"ipaddress" : req.headers['x-forwarded-for'],"language": req.headers['accept-language'],"software":agent.os.toString()})
    console.log(agent)
})



app.listen(process.env.PORT|| 8080, function () {
  console.log('Example app listening on port 8080!')
})
