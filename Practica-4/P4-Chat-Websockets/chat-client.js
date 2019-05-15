function main() {
  var name = prompt("Please enter your name:","")
  var username = document.getElementById('username');
  username.innerHTML += name;
  console.log("Hola!!!!-------------")

  //-- Crear el websocket
  var socket = io();
  /*
  Otra comunicacion full duplex(bidirecccional) que se puede abrir entre
  cliente y servidor
  socket.emit('mensajes_internos', 'Mensajes internos abiertos');
  */

  //-- Obtener los elementos de interfaz:
  var send = document.getElementById('send')//-- Boton de envio de mensaje
  var mensajes = document.getElementById('mensajes')  //-- cuadro para mostrar mensajes recibidos
  var msg = document.getElementById("msg")  //-- Caja con el mensaje a enviar


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

/*Otra comunicacion full duplex(bidirecccional) que se puede abrir entre
  cliente y servidor
  socket.on('mensajes_internos',msg =>{
    console.log("mensaje interno = " + msg);
  })
*/
}
