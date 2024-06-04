const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Perfil = require('../models/profile');

const router = express.Router();

// @route    POST api/perfil
// @desc     Crear o actualizar perfil de usuario
// @access   Private
router.post('/',
  [
    auth,
    [
      check('nombre', 'Nombre es requerido').not().isEmpty(),
      check('correo', 'Correo es requerido').isEmail(),
      check('universidad', 'Universidad es requerida').not().isEmpty(),
      check('carrera', 'Carrera es requerida').not().isEmpty(),
      check('habilidadesTecnicas', 'Habilidades Técnicas son requeridas').not().isEmpty(),
      check('habilidadesBlandas', 'Habilidades Blandas son requeridas').not().isEmpty(),
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
      nivelEducativo,
      InicioEstudios,
      Graduacion,
      Empresa,
      Puesto,
      InicioTrabajo,
      FinTrabajo,
      responsabilidades,
      idiomas,
      habilidadesTecnicas,
      habilidadesBlandas,
      nombreProyecto,
      descripcionProyecto
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
    if (nivelEducativo) perfilCampos.nivelEducativo = nivelEducativo;
    if (InicioEstudios) perfilCampos.InicioEstudios = InicioEstudios;
    if (Graduacion) perfilCampos.Graduacion = Graduacion;
    if (Empresa) perfilCampos.Empresa = Empresa;
    if (Puesto) perfilCampos.Puesto = Puesto;
    if (InicioTrabajo) perfilCampos.InicioTrabajo = InicioTrabajo;
    if (FinTrabajo) perfilCampos.FinTrabajo = FinTrabajo;
    if (responsabilidades) perfilCampos.responsabilidades = responsabilidades;
    if (idiomas) perfilCampos.idiomas = idiomas;
    if (habilidadesTecnicas) perfilCampos.habilidadesTecnicas = habilidadesTecnicas;
    if (habilidadesBlandas) perfilCampos.habilidadesBlandas = habilidadesBlandas;
    if (nombreProyecto) perfilCampos.nombreProyecto = nombreProyecto;
    if (descripcionProyecto) perfilCampos.descripcionProyecto = descripcionProyecto;

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
