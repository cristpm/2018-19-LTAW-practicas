var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var num_usuarios = 0;

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicitado")
});

//-- Servir el cliente css
app.get('/styles.css', function(req, res){
  res.sendFile(__dirname + '/styles.css');
  console.log('Fichero css solicitado');
})

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  console.log('--> Usuario conectado!');
  socket.emit("new_message", 'Bienvenido al chat');
  /*
  Otra comunicacion full duplex(bidirecccional) que se puede abrir entre
  cliente y servidor
  socket.emit('mensajes_internos', 'Mensajes internos abiertos');
  */
  socket.broadcast.emit('new_message', 'Un nuevo usuario se ha conectado');
  num_usuarios += 1;

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
    num_usuarios -= 1;
  });

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', msg => {
    var res = msg.split("/");
    //-- Notificarlo en la consola del servidor
    if ( res[res.length-1] == 'help') {
      socket.emit("new_message",
      " COMANDOS:<br>/help:Mostrará una lista con todos los comandos soportados <br>" +
      "/list: Devolverá el número de usuarios conectados <br>" +
      "/hello: El servidor nos devolverá el saludo <br>" +
      "/data: Nos devolverá la fecha");
    } else if ( res[res.length-1] == 'list') {
      socket.emit("new_message", "numero de usuarios: " + num_usuarios);
    } else if ( res[res.length-1] == 'hello') {
      socket.emit("new_message", "hello usuario");
    } else if ( res[res.length-1] == 'date') {
      socket.emit("new_message", "" + new Date());
    } else {
      //-- Emitir un mensaje a todos los clientes conectados
      io.emit('new_message', msg);
      console.log(msg)
    }
  })

  /*Otra comunicacion full duplex(bidirecccional) que se puede abrir entre
    cliente y servidor
    socket.on('mensajes_internos',msg =>{
      console.log("mensaje interno = " + msg);
    })
  */
});
