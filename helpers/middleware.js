const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const checkValidationErrors = (req, res, next) => {
  //Comprobar los errores de la validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  next();
}

const checkToken = async (req, res, next) => {
  //esta el token en la cabecera de Authorization?
  if (!req.headers['authorization']) {
    return res.status(401).json({ error: 'Debes incluir el token de autenticación' });
  }

  const token = req.headers['authorization'];

  //es correcto el token?
  let payload;
  try {
    payload = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).json({ error: 'El token es incorrecto' });
  }

  // Recupero el usuario a partir del token
  const user = await User.findById(payload.user_id);
  req.user = user;


  next();
}



module.exports = { checkValidationErrors, checkToken };