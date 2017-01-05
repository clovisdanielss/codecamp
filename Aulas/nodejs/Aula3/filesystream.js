var fs = require('fs')

fs.readFile(process.argv[2], function(err, data){
	if(err) throw err
	console.log(data.toString())
})

fs.writeFile(process.argv[2],'Arquivo criado usando nodejs...', function(err){
	if(err) throw err
	console.log('Arquivo Criado...')
})
