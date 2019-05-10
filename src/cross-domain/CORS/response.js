var express = require('express')
var app = express()

let whitList = ['http://localhost:7777'] //设置白名单

app.use((req, res, next) => {
  let origin = req.headers.origin
  if (req.method === 'POST' && whitList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else if (whitList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Headers', 'name')
    res.setHeader('Access-Control-Allow-Methods', 'PUT')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Max-Age', 10)
    res.setHeader('Access-Control-Expose-Headers', 'company')
  } else {
    return
  }
  next()
})

app.post('/', (req, res) => {
  console.log(req.headers)
  res.end('post request success')
})

app.put('/', (req, res) => {
  console.log('put request headers:\n', req.headers)
  res.setHeader('company', 'lambdacal')
  res.end('put request success')
})

app.use(express.static(__dirname))

app.listen(8888, () => {
  console.log('CORS response listening to port 8888!')
})
