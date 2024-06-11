const express = require('express');
const { check, validationResult } = require('express-validator');
const Perfil = require('../models/profile');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const perfil = await Perfil.findOne({ usuario: req.user.id });
    if (!perfil) {
      return res.status(404).json({ msg: 'No se encontró el perfil del usuario' });
    }
    res.json(perfil);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});


router.post(
  '/',
  [
    [
      check('nombre', 'Nombre es requerido').not().isEmpty(),
      check('correo', 'Correo es requerido').isEmail(),
      check('universidad', 'Universidad es requerida').not().isEmpty(),
      check('carrera', 'Carrera es requerida').not().isEmpty(),
      check('habilidades_tecnicas', 'Habilidades Técnicas son requeridas').not().isEmpty(),
      check('habilidades_blandas', 'Habilidades Blandas son requeridas').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      nombre,
      ubicacion,
      correo,
      telefono,
      universidad,
      carrera,
      nivel_educativo,
      fecha_inicio_estudios,
      fecha_graduacion_esperada,
      empresa,
      puesto,
      fecha_inicio_trabajo,
      fecha_fin_trabajo,
      responsabilidades,
      idiomas,
      habilidades_tecnicas,
      habilidades_blandas,
      proyecto_nombre,
      proyecto_descripcion
    } = req.body;

    // Construir objeto de perfil
    const perfilCampos = {};
    perfilCampos.usuario = req.user.id;
    if (nombre) perfilCampos.nombre = nombre;
    if (ubicacion) perfilCampos.ubicacion = ubicacion;
    if (correo) perfilCampos.correo = correo;
    if (telefono) perfilCampos.telefono = telefono;
    if (universidad) perfilCampos.universidad = universidad;
    if (carrera) perfilCampos.carrera = carrera;
    if (nivel_educativo) perfilCampos.nivel_educativo = nivel_educativo;
    if (fecha_inicio_estudios) perfilCampos.fecha_inicio_estudios = fecha_inicio_estudios;
    if (fecha_graduacion_esperada) perfilCampos.fecha_graduacion_esperada = fecha_graduacion_esperada;
    if (empresa) perfilCampos.empresa = empresa;
    if (puesto) perfilCampos.puesto = puesto;
    if (fecha_inicio_trabajo) perfilCampos.fecha_inicio_trabajo = fecha_inicio_trabajo;
    if (fecha_fin_trabajo) perfilCampos.fecha_fin_trabajo = fecha_fin_trabajo;
    if (responsabilidades) perfilCampos.responsabilidades = responsabilidades;
    if (idiomas) perfilCampos.idiomas = idiomas;
    if (habilidades_tecnicas) perfilCampos.habilidades_tecnicas = habilidades_tecnicas;
    if (habilidades_blandas) perfilCampos.habilidades_blandas = habilidades_blandas;
    if (proyecto_nombre) perfilCampos.proyecto_nombre = proyecto_nombre;
    if (proyecto_descripcion) perfilCampos.proyecto_descripcion = proyecto_descripcion;

    try {
      let perfil = await Perfil.findOne({ usuario: req.user.id });

      if (perfil) {
        // Actualizar
        perfil = await Perfil.findOneAndUpdate(
          { usuario: req.user.id },
          { $set: perfilCampos },
          { new: true }
        );

        return res.json(perfil);
      }

      // Crear
      perfil = new Perfil(perfilCampos);

      await perfil.save();
      res.json(perfil);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error en el servidor');
    }
  }
);

module.exports = router;
