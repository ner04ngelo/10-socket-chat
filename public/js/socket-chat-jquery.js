//=================================
// Funciones para renderizar usuarios
//=================================

var params = new URLSearchParams(window.location.search);
var sala = params.get('sala') || 'General';

var nombre = params.get('nombre');

// Referencias jquery

var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtChat = $('#txtChat');
var divChatbox = $('#divChatbox');


function renderizarUsuarios(personas) {
    var html = '';
    if (!sala === '') {
        console.log(personas);

        html += '<li>';
        html += ' <a href="javascript:void(0)" class="active"> Chat <span> ' + sala + '</span></a>';
        html += '</li>';
    } else {

        html += '<li>';
        html += ' <a href="javascript:void(0)" class="active"> Chat <span> ' + sala + '</span></a>';
        html += '</li>';
    }

    personas.forEach(persona => {
        html += '<li>';
        html += '    <a  data-id= "' + persona.id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + persona.nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    });

    divUsuarios.html(html);

}


function renderizarMensajes(mensaje) {
    var html = '';

    html += '<li class="animated fadeIn">';
    html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
    html += '<div class="chat-content">';
    html += '    <h5>' + mensaje.nombre + '</h5>';
    html += '    <div class="box bg-light-info">' + mensaje.mensaje + '</div>';
    html += '</div>';
    html += '<div class="chat-time">10:56 am</div>';
    html += '</li>';

    divChatbox.append(html);

}


//Listeners


divUsuarios.on('click', 'a', function() {

    var id = $(this).data('id');

    if (id) {

        console.log(id);
    }
});


formEnviar.on('submit', function(e) {

    e.preventDefault();
    if (txtChat.val().trim().length === 0) return;


    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtChat.val()
    }, function(mensaje) {
        console.log(mensaje);
        txtChat.val('').focus();
        renderizarMensajes(mensaje);
    });
});