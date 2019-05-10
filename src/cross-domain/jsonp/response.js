var express = require('express')
var app = express()

app.get('/', function(req, res) {
  const { callback } = req.query
  res.send(`${callback}('hello jsonp')`)
})

app.listen(8888, function() {
  console.log('jsonp response listening to port 8888!')
})
