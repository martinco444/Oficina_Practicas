const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');


// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, personType } = req.body;

        if (!username || !email || !password || !personType) {
            return res.status(400).json({ msg: 'Por favor ingrese todos los campos' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        user = new User({ username, email, password, personType });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'Usuario registrado con éxito' });
    } catch (err) {
        console.error('Error durante el registro:', err.message);
        res.status(500).send('Error del servidor');
    }
});

// Ruta para iniciar sesión
router.post(
    '/login',
    [
        check('email', 'Por favor incluye un correo válido').isEmail(),
        check('password', 'La contraseña es requerida').exists(),
        check('personType', 'El tipo de persona es requerido').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, personType } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Credenciales inválidas' });
            }

            if (user.personType !== personType) {
                return res.status(400).json({ msg: 'Tipo de persona incorrecto' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Credenciales inválidas' });
            }

            // En lugar de devolver un token, simplemente devolver un mensaje de éxito
            res.status(200).json({ msg: 'Inicio de sesión exitoso' });
        } catch (err) {
            console.error('Error durante el inicio de sesión:', err.message);
            res.status(500).send('Error del servidor');
        }
    }
);

module.exports = router;
