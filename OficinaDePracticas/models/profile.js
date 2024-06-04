const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
  nombre: {type: String, required: true },
  ubicacion: {type: String},
  correo: {type: String,required: true, unique: true},
  telefono: {type: String},
  universidad: {type: String, required: true},
  carrera: {type:String, required: true},
  nivelEducativo: {type:String},
  InicioEstudios: {type:Date},
  Graduacion: {type:Date},
  Empresa: {type:String},
  Puesto: {type:String},
  InicioTrabajo: {type:Date},
  FinTrabajo: {type:Date},
  responsabilidades: {type:String},
  idiomas: {type:String},
  habilidadesTecnicas: {type:String, required: true},
  habilidadesBlandas: {type:String, required: true},
  nombreProyecto: {type:String},
  descripcionProyecto: {type:String}
});

module.exports = mongoose.model('Perfil', ProfileSchema);