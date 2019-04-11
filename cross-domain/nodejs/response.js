var express = require('express')
var app = express()

app.post('/', function(req, res) {
  res.end('nodejs request success')
})

app.listen(8888, function() {
  console.log('nodejs response listening to port 8888!')
})
