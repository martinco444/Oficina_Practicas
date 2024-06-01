const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto');

const JWT_SECRET = crypto.randomBytes(64).toString('hex');

// Ruta de registro
router.post('/register', async (req, res) => {
  // Manejo de la solicitud POST para el registro de usuario
  try {
    // Obtener datos del cuerpo de la solicitud
    const { username, email, password, personType } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!username || !email || !password || !personType) {
      return res.status(400).json({ msg: 'Por favor ingrese todos los campos' });
    }

    // Verificar si el usuario ya existe en la base de datos
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    user = new User({ username, email, password, personType });

    // Encriptar la contraseña antes de almacenarla en la base de datos
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar el usuario en la base de datos
    await user.save();

    // Responder con un mensaje de éxito
    res.status(201).json({ msg: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error('Error durante el registro:', err.message);
    res.status(500).send('Error del servidor');
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  // Manejo de la solicitud POST para el inicio de sesión del usuario
  try {
    // Obtener datos del cuerpo de la solicitud
    const { email, password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Verificar si la contraseña proporcionada coincide con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Generar un token JWT para autenticación
    const payload = { user: { id: user.id } };
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error al generar token JWT:', err.message);
        throw err;
      }
      res.json({ token });
    });
  } catch (err) {
    console.error('Error durante el inicio de sesión:', err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
