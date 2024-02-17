var filtroPesos;

function capturaDatos() {
	$.ajax({
		url: "https://mindicador.cl/api",
		method: "GET",
		success: function (datosIndicador) {
			// Filtrar los indicadores económicos con moneda "Peso"
			const filteredData = {};
			filtroPesos = filteredData;
			for (const key in datosIndicador) {
				if (datosIndicador[key].unidad_medida === "Pesos") {
					filteredData[key] = datosIndicador[key];
				}
			}

			// Extraer el nombre y el valor
			const extractedData = [];
			for (const key in filteredData) {
				extractedData.push({
					nombre: key,
					valor: Number(filteredData[key].valor).toLocaleString("es-CL"),
				});
			}

			// Añadir los datos a la tabla
			const table = $("#indicadores").find("tbody")[0];
			for (const item of extractedData) {
				const row = $(table).append("<tr></tr>");
				$(row).append("<td class='text-start ps-5'>" + item.nombre.toUpperCase() + "</td>");
				$(row).append("<td class='text-end pe-5'>" + item.valor + "</td>");
			}

			// Añadir los keys a la lista desplegable id-select
			const select = $("#id-select");
			for (const key in filteredData) {
				$(select).append(new Option(key.toUpperCase(), key));
			}
		},
	});
}

// La función `capturaDatos()` es una función asíncrona que obtiene datos de la
// URL 'https://mindicador.cl/api'. Luego filtra los datos para incluir solo indicadores con la
// moneda "Peso". Después de filtrar, extrae el nombre y el valor de cada indicador y los agrega a
// una tabla con el id 'indicadores'.
capturaDatos();

$(document).ready(function () {
	var rotation = 0;
	$("#id-img-arrows").click(function () {
		rotation += 180;
		$(this).css({
			transform: "rotate(" + rotation + "deg)",
			transition: "1s",
		});
		var textoP1 = $("#p-1").text();
		var textoP2 = $("#p-2").text();
		var texto3 = $("#id-input").val(); 
		var texto4 = $("#id-result").text();
		console.log("va al input" + texto4);
		$("#p-1").text(textoP2);
		$("#p-2").text(textoP1);
		$("#id-input").val(texto4);
		$("#id-result").text(texto3);

	});

	$(".input").click(function () {
		$(this).focus();
	});

	$("#id-input").on("input", function () {
		var valorInput = $(this).val();
		var valorSelect = $("#id-select").val();
		calcularIndicadores(valorInput, valorSelect);
	});

	$("#id-select").change(function(){
		var valorSelect = $("#id-select").val();
		$("#p-1").text(valorSelect.toUpperCase());
		$("#p-2").text("CLP");
		$("#id-input").val(0);
		$("#id-result").text("0");
	})



	function calcularIndicadores(valorInput, valorSelect) {
		console.log(valorInput,valorSelect);
		for (const key in filtroPesos) {
			if (key == valorSelect) {
				var resultado = valorInput * filtroPesos[valorSelect].valor;
				var valorFormateado = Number(resultado).toLocaleString("es-CL"); // Formato chileno
				console.log("formateado" + valorFormateado);
				// Muestra el resultado en el elemento con id "resultado"
				$("#id-result").text(resultado);
			}
		}
	}



});
