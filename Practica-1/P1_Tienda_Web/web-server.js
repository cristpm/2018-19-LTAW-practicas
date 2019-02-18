var http = require('http');
var url = require('url');
var fs = require('fs');
console.log("Arrancando servidor...");

http.createServer((req, res) => {
  // Para cada peticion recibida se imprime
  // un mensaje y la url de la peticon
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  var q = url.parse(req.url, true);
  console.log("URL parseada: ")
  console.log("Host: " + q.host)
  console.log("pathname:" + q.pathname)
  //////////////////////////////////////////

  //Obtenemos el nombre y tipo de fichero
  // que se solicita en la url
  var filename = ""
  if (q.pathname == "/")
    filename += "/index.html"
  else {
    filename = q.pathname
  }
  tipo = filename.split(".")[1]
  filename = "." + filename
  console.log("Filename: " + filename)
  console.log("Tipo: " + tipo)
  /////////////////////////////////////////

  // Leemos el archivo de la peticion  encribimos
  // la respuesta y la enviamos
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    var mime = "text/html"//-- Tipo mime por defecto: html

    if (['png', 'jpg'].includes(tipo)) {
      console.log("IMAGEN!!!!!")
      mime = "image/" + tipo
    }

    if (tipo == "css")
      mime = "text/css"

    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    return res.end();
  });
  ////////////////////////////////////////

}).listen(8080);
