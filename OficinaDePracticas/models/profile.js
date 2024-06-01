const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
  nombre: {type: String, required: true },
  ubicacion: {type: String},
  correo: {type: String,required: true, unique: true},
  telefono: {type: String},
  universidad: {type: String},
});

module.exports = mongoose.model('Perfil', ProfileSchema);

 
