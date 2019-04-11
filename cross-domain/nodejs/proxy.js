const http = require('http')
const server = http.createServer((request, response) => {
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  })

  const options = {
    host: 'localhost',
    port: 8888,
    method: request.method,
    headers: request.headers
  }

  http
    .request(options, serverResponse => {
      var body = ''
      serverResponse.on('data', chunk => {
        body += chunk
      })
      serverResponse.on('end', () => {
        console.log('The data is ' + body)
        response.end(body)
      })
    })
    .end()
})
server.listen(9999, () => {
  console.log('The proxyServer is running at http://localhost:9999')
})
