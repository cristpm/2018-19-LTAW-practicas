var http = require('http');
var url = require('url');
var fs = require('fs');

console.log("Arrancando servidor...");

http.createServer(function (req, res) {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  var q = url.parse(req.url, true);
  console.log("URL parseada: ")
  console.log("Host: " + q.host)
  console.log("pathname:" + q.pathname)
  var filename = q.pathname;
  var tipo= filename.split(".")[1];

  if (filename == "/") {
    filename = "./index.html";
    tipo = "html"
  } else {
    filename = "." + filename;
  }
  console.log("Filename: " + filename)
  console.log("Tipo: " + tipo)
  console.log("//////////////////////")

  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found, Fichero no encontrado");
    }
    mime = "text/html";
    if (tipo == ("jpg" || "png")) {
      mime = "image/" + tipo;
    } else if (tipo == "css") {
      mime = "text/css";
    }
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    return res.end();
  });
  console.log("Peticion atendida");
  console.log("//////////////////////")

}).listen(8080);
