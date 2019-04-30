const io = require('socket.io-client');
const socket = io('http://localhost:3000');

function main() {
  //var name = prompt("Please enter your name:","")
  var username = "Client ELECTRON"//document.getElementById('username');
  //username.innerHTML += name;
  console.log("Hola!!!!-------------")



  //-- Obtener los elementos de interfaz:
  //-- Boton de envio de mensaje
  var send = document.getElementById('send')
  //-- cuadro para mostrar mensajes recibidos
  var mensajes = document.getElementById('mensajes')
  //-- Caja con el mensaje a enviar
  var msg = document.getElementById("msg")

  //-- Cuando se aprieta el botón de enviar...
  send.onclick = () => {
    //-- Enviar el mensaje, con el evento "new_message"
    console.log(msg.value);
    socket.emit('new_message', name + ': ' + msg.value);
    document.getElementById("msg").value = '';
    //-- Lo notificamos en la consola del navegador
    console.log("Mensaje emitido")
  }

  //-- Cuando se reciba un mensaje del servidor se muestra
  //-- en el párrafo
  socket.on('new_message', msg => {
    var mensaje = document.createElement("P");
    mensaje.innerHTML = msg;
    mensajes.appendChild(mensaje);
  });

}
