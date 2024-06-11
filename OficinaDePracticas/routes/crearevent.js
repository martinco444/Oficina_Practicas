const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Event = require('../models/Event');

// Ruta para crear un evento
router.post(
    '/create',
    [
        check('eventname', 'El nombre del evento es obligatorio').not().isEmpty(),
        check('professor', 'El nombre del profesor es obligatorio').not().isEmpty(),
        check('reason', 'La razón del evento es obligatoria').not().isEmpty(),
        check('members', 'Los miembros son obligatorios').isArray({ min: 1 }).withMessage('Debe haber al menos un miembro'),
        check('date', 'La fecha del evento es obligatoria').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { eventname, professor, reason, members, date, summary } = req.body;

        try {
            let event = new Event({
                eventname,
                professor,
                reason,
                members,
                date,
                summary
            });

            event = await event.save();

            res.json(event);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// Ruta para obtener los eventos de un usuario específico
router.get('/user/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const events = await Event.find({ members: email });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
