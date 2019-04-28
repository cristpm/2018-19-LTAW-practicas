const electron = require('electron')

console.log("Arrancando electron...")

//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', ()=>{
  console.log("Evento Ready!")

  // Crear la ventana principal de nuestra Interfaz Gráfica
  win = new electron.BrowserWindow({
    width: 1000,
    height: 800
  })

  //win.setMenuBarVisibility(false)

  //-- Cargar la interfaz gráfica, que se encuentra en el
  //-- fichero index.html
  win.loadFile('index.html')
})
