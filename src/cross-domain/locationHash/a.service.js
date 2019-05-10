const express = require('express')

const app = express()

app.use(express.static(__dirname))

app.listen(7777, () => {
  console.log('location.hash a index port 7777')
})
