function main(){
	var m = new XMLHttpRequest();
	var input = document.getElementById("search");
  m.open("POST", "/search" , true);
	m.onreadystatechange = function() {
		if (m.readyState == 4 && m.status == 200) {
			console.log(m.responseText)
			if(input.value.length < 3){
				//-- Borra cualquier opcion de resultado menor de 3 caracteres
        resultado.innerHTML = "";
			}
	 	 	if(input.value.length == 3){
	 	 		data_list = document.getElementById("resultado");
	 	 		var o = JSON.parse(m.responseText);
        resultado.innerHTML = "";
		 	 	for (var i = 0; i < o.productos.length; i++) {
	 	 			var option = document.createElement("OPTION");
	 	 			option.value = o.productos[i];
	 	 			data_list.appendChild(option);
	 	 		};
	 	 	}
	 	}
	}
	m.send(input.value);
}
