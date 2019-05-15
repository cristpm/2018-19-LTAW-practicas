function main(){
  var lista = document.getElementById('lista')
  var mensaje = document.createElement("P");
  var x = document.cookie;
  mensaje.innerHTML = x;
  lista.appendChild(mensaje);
}
