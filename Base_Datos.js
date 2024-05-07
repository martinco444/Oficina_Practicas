var bd;

function IniciarBaseDatos(){

    var btnRegister = document.querySelector('#btnRegister');
    btnRegister = addEventListener("click", almacenarEstudiate);
   var solicitud = indexedDB.open("Datos_Estudiantes_practicas");


   solicitud.addEventListener("error", MostrarError);
   
   solicitud.addEventListener("success", Comenzar);
   
   solicitud.addEventListener("upgradeneeded", CrearAlmacen);
}


function MostrarError(evento){

    alert ("Error presentado: " + evento.code + " / " + evento.message);

}

function Comenzar(evento){

    bd = evento.target.result;
    console.log("funcion comenzar");
}

function CrearAlmacen(evento){

    var baseDatos = evento.target.result;
    var almacen = baseDatos.createObjectStore("Estudiantes", {keyPath: "codigo"});
    almacen.createIndex("BuscarNombre", "nombre", {unique: false});
    console.log("funcion crear almacen");
}

function almacenarEstudiate(){

    var programaAcademico = document.querySelector('#academicProgram').value; 
    var jornada = document.querySelector('#jornada').value; 
    var nombre = document.querySelector('#nameUser').value; 
    var code = document.querySelector('#code').value; 
    var id = document.querySelector('#id').value; 
    var numeroTelefono = document.querySelector('#numTel').value; 
    var email = document.querySelector('#emailNewUser').value; 
    var contraseña = document.querySelector('#passNewUser').value; 
    var correoU = document.querySelector('#emailUniverity').value; 

    var transaccion = bd.transaction(['Estudiantes'], 'readwrite');
    var almacen = transaccion.objectStore("Estudiantes");

    almacen.add({
        academicProgram : programaAcademico,
        jornada : jornada,
        nombre : nombre,
        code : code,
        id : id,
        numTel : numeroTelefono,
        emailNewUser : email,
        passNewUser : contraseña,
        emailUniverity : correoU
    });

    document.querySelector('#academicProgram').value = ""; 
    document.querySelector('#jornada').value = ""; 
    document.querySelector('#nameUser').value = ""; 
    document.querySelector('#code').value = ""; 
    document.querySelector('#id').value = ""; 
    document.querySelector('#id').value = ""; 
    document.querySelector('#numTel').value = ""; 
    document.querySelector('#emailNewUser').value = ""; 
    document.querySelector('#passNewUser').value = ""; 
    document.querySelector('#emailUniverity').value = "";
}

window.addEventListener("load", IniciarBaseDatos);