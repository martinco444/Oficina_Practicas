const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');  

const router = express.Router();

router.post('/register', async (req, res) => {
  console.log('Solicitud de registro recibida');
  const { username, email, password, personType } = req.body;

  try {
    console.log('Buscando usuario existente...');
    let user = await User.findOne({ email });
    if (user) {
      console.log('El usuario ya existe');
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    console.log('Creando nuevo usuario...');
    user = new User({ username, email, password, personType });

    // Encriptar contraseña
    console.log('Encriptando contraseña...');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    console.log('Guardando usuario en la base de datos...');

    //guardar
    await user.save();

    console.log('Usuario registrado con éxito');
    res.status(201).json({ msg: 'Usuario registrado con éxito' });
  } catch (err) {
    console.error('Error durante el registro:', err.message);
    res.status(500).send('Error del servidor');
  }
});


// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  console.log('Solicitud de inicio de sesión recibida');
  const { email, password } = req.body;

  try {
    console.log('Buscando usuario...');
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    console.log('Verificando contraseña...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    console.log('Generando token JWT...');
    const payload = { user: { id: user.id } };
    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) {
        console.error('Error al generar token JWT:', err.message);
        throw err;
      }
      console.log('Token JWT generado con éxito');
      res.json({ token });
    });
  } catch (err) {
    console.error('Error durante el inicio de sesión:', err.message);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
