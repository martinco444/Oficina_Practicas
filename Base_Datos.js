var bd;

function iniciarBaseDatos(){
    indexedDB.open("Datos_Estudiantes_practicas");
}

window.addEventListener("load", iniciarBaseDatos);