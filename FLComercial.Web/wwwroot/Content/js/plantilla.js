/* SIDEBAR MENU */
$('.sidebar-menu').tree()
/* DATA TABLE */
$('.tablas').DataTable({
	"language": {
			"sProcessing": 		"Procesando...",
			"sLengthMenu": 		"Mostrar _MENU_ Registros",
			"sZeroRecords": 	"No se encontraron Resultados",
			"sEmptyTable": 		"Ningun dato disponible",
			"sInfo": 			"Mostrando registro del _START_ al _END_ de un total de _TOTAL_",
			"sInfoEmpty": 		"Mostrando registro del 0 al 0 de un total de 0",
			"sInfoFiltered": 	"(Filtrado de un total de _MAX_ registros)",
			"sInfoPostFix": 	"",
			"sSearch": 			"Buscar:",
			"sUrl": 			"",
			"sInfoThousands": 	",",
			"sLoadingRecords": 	"Cargando...",
			"oPaginate": {
				"sFirts": 	    "Primero",
				"sLast": 	    "Último",
				"sNext": 	    "Siguiente",
				"sPrevious": 	"Anterior"
			},
			
			"öAria":{
				"sSortAscending": 	":Activar para ordenar la columna de manera ascendente",
				"sSortDescending": 	":Activar para ordenar la columna de manera descendente"
			}
	}
});