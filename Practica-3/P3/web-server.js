 var http = require('http');
var url = require('url');
var fs = require('fs');

var productos = [ {name: "SAMSUNG-S8", price:"349" , stock: "10"},
                  {name: "SAMSUNG-S9", price:"548" , stock: "10"},
                  {name: "SAMSUNG-S10", price:"749" , stock: "10"},
                  {name: "SAMSUNG-tv-32", price:"349" , stock: "10"},
                  {name: "SAMSUNG-tv-55", price:"549" , stock: "10"},
                  {name: "SAMSUNG-tv-55", price:"549" , stock: "10"},
                  {name: "SAMSUNG-tv-65", price:"848" , stock: "10"},
                  {name: "MSI-1", price:"849" , stock: "10"},
                  {name: "MSI-2", price:"949" , stock: "10"},
                  {name: "MSI-3", price:"1049" , stock: "10"},]

console.log("Arrancando servidor...");

http.createServer(function (req, res) {
  console.log("-----------------> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
  var q = url.parse(req.url, true);
  var filename = q.pathname;
  var tipo= filename.split(".")[1];
  console.log("tipo: " + tipo)

  //-- Leer las cookies que envia el cliente en la request= solicitud
  var cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)

  //Se pide el recurso principal
  if (filename == "/") {
    filename = "./recursos/index.html";
    tipo = "html"
  }else{
    //Se pide un recurso con tipo definido
    if(tipo == "html" || tipo == "css"|| tipo =="png" ||tipo == "jpg" ||tipo == "js"){
      if( filename == "/login.html"){
        res.setHeader('Set-Cookie', 'user=Comprador')
      }
      filename = "./recursos" + filename;
    //Se pide otro tipo de recurso
    }else{
      if(filename == "/form-compra"){
        if (req.method === 'POST'){
                  var content = `
                  <!DOCTYPE html>
                  <html lang="es">
                    <head><meta charset="utf-8">title>FORM 1</title></head>
                    <body>
                      <h1>FELICIDADES TU PEDIDO SE HA PROCESADO </h1>
                      <h3>Datos Recibidos:</h3><p>`
                  req.on('data', chunk => {
                      data = chunk.toString();//-- Leer los datos (convertir el buffer a cadena)
                      content += data;//-- Añadir los datos a la respuesta
                      //-- Fin del mensaje. Enlace al formulario
                      content += `
                        </p><h3>Pedido:</h3><p>`
                      content += cookie
                      content += `</p>
                        <a href="/">[Volver al inicio]</a>
                        </body>
                      </html> `
                      console.log("Datos recibidos:" + data)//-- Mostrar los datos en la consola del servidor
                      res.statusCode = 200;
                   });

                   req.on('end', ()=> {
                     //-- Generar el mensaje de respuesta
                     res.setHeader('Content-Type', 'text/html')
                     res.write(content);
                     res.end();
                   })
                   return
        }
      }else if (filename == "/search-on") {
        var recurso = ""
        req.on('data', chunk => {
            //-- Leer los datos (convertir el buffer a cadena)
            data = chunk.toString();
            recurso = data;
            console.log("Datos recibidos: " + data)
            filename = data.split("=")[1];
            filename = "./recursos/" + filename + ".html";
            console.log(filename)
         });
         req.on('end', function() {
           filename = recurso.split("=")[1];
           filename = "./recursos/" + filename + ".html";
           console.log(filename)
           fs.readFile(filename,function(error,data){
             res.setHeader('Content-Type',"text/html");
             res.write(data);
             res.end();
           });
         });
         return
      }else if (filename == "/search") {
        var body = [];
        req.on('data', function(chunk) {
          body.push(chunk);
          console.log(body);
        });
        req.on('end', function() {
          body = Buffer.concat(body).toString();
          console.log(body)
          fs.readFile("./recursos/productos-list.json",function(error,data){
            data = JSON.parse(data)//de texto a objeto
            data = JSON.stringify(data);
            console.log(data)
            res.setHeader('Content-Type','application/json');
            res.write(data);
            res.end();
          });
        });
        return
      }else if(filename == "/descuento"){//se envia un descuento
        console.log("me envian un codigo de desxuento:");
        var codigo ="";
        req.on('data', function(chunk) {
          codigo =  chunk.toString();
          console.log(codigo);
        });

        req.on('end', function() {
          fs.readFile("./recursos/descuentos-list.json",function(error,data){
            data = JSON.parse(data)//de texto a objeto
            console.log(data.descuentos[0])
            data = JSON.stringify(data);
            console.log(data)
            res.setHeader('Content-Type','application/json');
            res.write(data);
            res.end();
          });
        });
        return
      }else{//Se pulsa boton de añadir al carrito
        product_name = filename.split("/")[1];
        product_price= giveprice(product_name, productos)
        res.setHeader('Set-Cookie', product_name +"="+ product_price)
        filename = "./recursos" + filename + ".html";
        tipo = "html"
      }
    }
  }

  console.log("pathname:" + q.pathname)
  console.log("filename:" + filename)

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
    }else if (tipo == "js") {
      mime = "application/javascript"
    }
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    return res.end();
  });
  console.log("Peticion atendida");
  console.log("///////////////////////////////////////////////////////////////")

}).listen(8080);


function giveprice(product_name, productos) {
  var price;
  for (i = 0; i < productos.length; i++) {
    if(productos[i].name == product_name){
      return price = productos[i].price
    }
  }
}
