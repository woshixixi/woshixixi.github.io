const express = require("express")

const app = express()

app.use(express.static(__dirname))

app.listen(7778, () => {
  console.log("window.name b index port 7778")
})
