const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT
const verificarToken = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const token = req.headers['authorization'];

  // Si no existe el token, devolver un error
  if (!token) {
    return res.status(403).json({ mensaje: 'Token no proporcionado' });
  }

  // Eliminar el prefijo 'Bearer ' del token (si lo tiene)
  const tokenLimpio = token.split(' ')[1];

  // Verificar el token usando jsonwebtoken
  jwt.verify(tokenLimpio, 'mi_secreto', (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: 'Token no válido' });
    }

    // Si el token es válido, se agrega la información del usuario a la solicitud
    req.usuario = decoded;
    next(); // Llamamos a la siguiente función de middleware
  });
};

module.exports = verificarToken;
