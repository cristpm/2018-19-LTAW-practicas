var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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
  socket.broadcast.emit('new_message', 'Un nuevo usuario se ha conectado');

  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){
    console.log('--> Usuario Desconectado');
  });

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', msg => {
    var res = msg.split("/");
    //-- Notificarlo en la consola del servidor
    console.log(res[res.length-1])
    if ( res[res.length-1] == 'help') {
      socket.emit("new_message",
      " COMANDOS:<br>/help:Mostrará una lista con todos los comandos soportados <br>" +
      "/list: <br>/hello: <br>/data:")
    } else if ( res[res.length-1] == 'list') {
      socket.emit("new_message", "numero de usuarios")
    } else if ( res[res.length-1] == 'hello') {
      socket.emit("new_message", "hello")
    } else if ( res[res.length-1] == 'date') {
      socket.emit("new_message", "" + new Date())
    } else {
      //-- Emitir un mensaje a todos los clientes conectados
      io.emit('new_message', msg);
      console.log(msg)
    }
  })

});
