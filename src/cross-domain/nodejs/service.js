const express = require('express')
const app = express()

app.use(express.static(__dirname))
app.listen(7777, () => {
  console.log('nodejs demo listening to  http://localhost:7777')
})
