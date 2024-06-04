const jwt = require('jsonwebtoken');
const config = require('../config/db');

module.exports = function (req, res, next) {
  // Obtener el token del encabezado de la solicitud
  const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;

  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verificar el token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user; // Decodificar y obtener la información del usuario
    next(); // Pasar al siguiente middleware o ruta
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
