var bd;

function IniciarBaseDatos(){
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


window.addEventListener("load", IniciarBaseDatos);