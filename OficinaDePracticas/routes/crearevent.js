const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Event = require('../models/event');

const router = express.Router();

router.post(
  '/',
  [
    auth,
    [
      check('eventname', 'El nombre del evento es requerido').not().isEmpty(),
      check('professor', 'El nombre del profesor es requerido').not().isEmpty(),
      check('reason', 'La razón del evento es requerida').not().isEmpty(),
      check('members', 'Los participantes son requeridos').not().isEmpty(),
      check('date', 'La fecha del evento es requerida').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { eventname, professor, reason, members, date, summary } = req.body;

    try {
      const newEvent = new Event({
        eventname,
        professor,
        reason,
        members: members.split(',').map(member => member.trim()),
        date,
        summary
      });

      const event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor');
    }
  }
);

module.exports = router;
