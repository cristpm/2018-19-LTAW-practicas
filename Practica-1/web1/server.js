var http = require('http');

console.log("Arrancando servidor...")


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
  res.write(req.url);
  res.end();
  console.log("Peticion atendida")
}).listen(8080);
