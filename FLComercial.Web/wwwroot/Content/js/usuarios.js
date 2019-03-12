/*=============================================
=           obtener un Usuarios po su ID         =
=============================================*/

$('#ModalEditarUsuario').on('shown.bs.modal', function () {
    $('myInput').focus()
})

function ObtenerUsuarioPorId(id, action) {
    $.ajax({
        type: "POST",
        url: action,
        data: { id },
        success: function (res) {
            //console.log(res);//ver en consola
            mostrarUsuario(res);
        }
    });
}

var items;
var j = 0;
var k = 0;
//variable globales por cada propiedad del usuario
var id;
var userName;
var email;
var phoneNumber;
var role;
var selectRole;
// otras variables que donde almacenaremos los datos del registro, pero que no seran modificados
var accessFailedCount;
var concurrencyStamp;
var emailConfirmed;
var lockoutEnabled;
var lockoutEnd;
var normalizedUerName;
var normalizedEmail;
var passwordHash;
var phoneNumberConfirmed;
var securityStamp;
var twoFactorEnabled;

function mostrarUsuario(res) {
    items = res;
    j = 0;
    //modificacion por la cantidad de roles que se crean
    for (var i = 0; i < 3; i++) {
        var x = document.getElementById('Select');
        x.remove(i);
    }
    //fin del contador de los roles
    $.each(items, function (index, val) {
        $('input[name=Id]').val(val.id);
        $('input[name=UserName]').val(val.userName);
        $('input[name=Email]').val(val.email);
        $('input[name=PhoneNumber]').val(val.phoneNumber);
        //mostrar el rol y id
        document.getElementById('Select').options[0] = new Option(val.role, val.roleId);

        //mostrar los detalles del usuario
        $("#dEmail").text(val.email);
        $("#dUserName").text(val.userName);
        $("#dPhoneNumber").text(val.phoneNumber);
        $("#dRole").text(val.role);

        //mostrar los datos del usuario que deseo eliminar
        $("#eUsuario").text(val.userName);
        $('input[name=EIdUsuario]').val(val.id);
        
    })
}

//funcion para obtener los roles

function getRoles(action) {
    $.ajax({
        type: "POST",
        url: action,
        data:{},
        success: function (res) {
            if (j == 0) {
                for (var i = 0; i < res.length; i++) {
                    document.getElementById('Select').options[i] = new Option(res[i].text, res[i].value);
                    //document.getElementById('SelectNuevo').options[i] = new Option(res[i].text, res[i].value);
                }
                j = 1;
            }
        }
    });
}

/*======actualizar losdatos de un Usuarios po su ID=====*/
function editarUsuario(action) {
    id = $('input[name=Id]')[0].value;
    email = $('input[name=Email]')[0].value;
    phoneNumber = $('input[name=PhoneNumber]')[0].value;
    role = document.getElementById('Select');
    selectRole = role.options[role.selectedIndex].text;

    $.each(items, function (index, val) {
        accessFailedCount = val.accessFailedCount;
        concurrencyStamp = val.concurrencyStamp;
        emailConfirmed = val.emailConfirmed;
        lockoutEnabled = val.lockoutEnabled;
        lockoutEnd = val.lockoutEnd;
        userName = val.userName;
        normalizedUerName = val.normalizedUerName;
        normalizedEmail = val.normalizedEmail;
        passwordHash = val.passwordHash;
        phoneNumberConfirmed = val.phoneNumberConfirmed;
        securityStamp = val.securityStamp;
        twoFactorEnabled = val.twoFactorEnabled;
    });
    //enviamos los datos al formulario
    $.ajax({
        type: "POST",
        url: action,//parametro que recibe la funcion
        data: {
            id, userName, email, phoneNumber, accessFailedCount, concurrencyStamp, emailConfirmed, lockoutEnabled, lockoutEnd, normalizedEmail, normalizedUerName, passwordHash, phoneNumberConfirmed, securityStamp, twoFactorEnabled, selectRole
        },
        success: function (res) {
            if (res == "Save") {
                swal('Guardado Exitoso!', 'Los datos se guardaron correctamente!', 'success')
                window.location.href = "Usuarios";
            }
            else {
                //<script>
                    swal('Error!', 'Error al actualizar los datos!', 'danger')
                //</script>
                //alert("Error al Editar los datos del Usuarios");
            }
        }
    });

}

function ocultarDetalleUsuario() {
    $("#ModalDetalleUsuario").modal("hide");
}
function eliminarUsuario(action) {
    var id = $('input[name=EIdUsuario]')[0].value;
    $.ajax({
        type: "POST",
        url: action,
        data: { id },
        success: function (res) {
            if (res == "Eliminado") {
                swal('Eliminado Exitoso!', 'El usuario ha sido eliminado!', 'success')
                window.location.href = "Usuarios";
            }
            else {
                //<script>
                swal('Error!', 'Error No se pudo eliminar el usuario!', 'danger')
                //</script>
                //alert("Error al Editar los datos del Usuarios");
            }
        }
    });
}

function crearUsuario(action) {
    //obtenemos los datos ingresados en el formulario
    email = $('input[name=EmailNuevo')[0].value;
    phoneNumber = $('input[name=PhoneNumberNuevo')[0].value;
    passwordHash = $('input[name=PasswordHashNuevo')[0].value;
    //role = document.getElementById('SelectNuevo');
    //selectRole = role.options[role.selectedIndex].text;
    //validamos que los datos  del formulario no esten vacio
    if (email == "") {

        //alert("Debe Ingresar un email");
        $('#EmailNuevo').focus();
        swal('Error', 'Error Ingrese su email!', 'error')
    }
    else {
        if (passwordHash == "") {

            //alert("Debe Ingresar un password para el usuario");
            $('#PasswordHashNuevo').focus();
            swal('Error', 'Error Ingrese el password', 'error')
        }
        else {
            $.ajax({
                type: "POST",
                url: action,
                data: {email, phoneNumber, passwordHash},
                success: function (res) {
                    if (res == "Save") {
                        //swal('Guardado Exitoso!', 'Los datos se guardaron correctamente!', 'success')
                        //
                        window.location.href = "Usuarios";
                        swal('Guardado Exitoso!', 'Los datos se guardaron correctamente!', 'success')
                    }
                    else {
                        //swal('Error', 'Error al actualizar los datos!', 'error')
                        $('#mensajeNuevo').html("No se puede guardar el usuario. <br/>Seleciones un rol. <br/> Ingrese un email correcto. <br/> el password debe tener de 6 a 100 caracteres, al menos un caracter especial, una letra mayuscula y un numero ");
                    }
                }
            });
        }
    }
}




/*=============================================
=            SUBIR IMAGEN         =
=============================================*/
//$(".txtFoto").change(function(){
//	var imagen=this.files[0];
//	/*validamos el formato de la imagen*/

//	if (imagen["type"] !="image/jpeg" && imagen["type"] !="image/png") {
//		$(".txtFoto").val("");
//		swal({
			
//			title: "Error al subir la imagen",
//			text:  "la imagen debe estar en formato JPG o PNG ",
//			type: "error",
//			confirmButtonText: "Cerrar!"
//	    });
//	}else if (imagen["size"]>2000000){
//		$(".txtFoto").val("");
//		swal({
			
//			title: "Error al subir la imagen",
//			text:  "la imagen no debe pesar mas de 2MB ",
//			type: "error",
//			confirmButtonText: "Cerrar!"
//	    });
//	}else{
//		var datosImagen = new FileReader;
//		datosImagen.readAsDataURL(imagen);

//		$(datosImagen).on("load",function(event){

//			var rutaImagen = event.target.result;
//			$(".previsualizar").attr("src",rutaImagen);
//		})
//	}


//	/*console.log("imagen",imagen);*/
//})
///*=============================================
//=            Editar Usuario     =
//=============================================*/
//$(".btnEditarUsuario").click(function(){
//	var idUsuario =$(this).attr("idUsuario");

//	var datos = new FormData();
//	datos.append("idUsuario",idUsuario);

//	$.ajax({

//		url:"ajax/usuarios.ajax.php",
//		method:"POST",
//		data: datos,
//		cache:false,
//		contentType:false,
//		processData:false,
//		dataType: "json",
//		success:function(res){

//			$("#editarNombre").val(res["nombre"]);
//			$("#editarApellidos").val(res["apellidos"]);
//			$("#editarUsuario").val(res["usuario"]);
//			$("#editarPerfil").html(res["idPerfil"]);

//			$("#nombreActual").val(res["nombre"]);
//			$("#apellidosActual").val(res["apellidos"]);
//			$("#passwordActual").val(res["password"]);
//			$("#fotoActual").val(res["foto"]);
//			$("#perfilActual").val(res["idPerfil"]);
			

//			if(res["foto"] != ""){
//				$(".previsualizar").attr("src", res["foto"]);
//			}

//		}
//	});
//	/*console.log("idUsuario",idUsuario);*/
//})

