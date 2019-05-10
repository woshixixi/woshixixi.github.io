var express = require('express')
var app = express()

app.use(express.static(__dirname))

app.listen(7777, function() {
  console.log('CORS demo service linstening to 7777')
})
