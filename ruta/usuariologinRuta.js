const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userModel = require('../modelo/Usuario');

router.use(cors());


const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token no proporcionado' });
  }
  try {
    const secretKey = process.env.SECRET_KEY || 'valor_predeterminado_si_no_hay_variable';
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error.message);
    res.status(401).json({ success: false, message: 'Token invÃ¡lido' });
  }
};


router.post('/login', async (req, res) => {
  const { nombre_usuario, password } = req.body;
  try {
    const user = await userModel.findOne({ nombre_usuario });
    if (user) {
      // Verificar si el estado del usuario es ACTIVO
      if (user.estado_usuario === 'ACTIVO') {
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          // Usuario autenticado correctamente
          const secretKey = process.env.SECRET_KEY || 'valor_predeterminado_si_no_hay_variable';

          const token = jwt.sign(
            { nombre_usuario, tipo_usuario: user.tipo_usuario, foto_usuario: user.foto_usuario , idpersonal: user.idpersonal,_id:user._id},
            secretKey,
            { expiresIn: '2h' }
          );

          res.json({ success: true, token });
        } else {
          // Credenciales incorrectas
          res.json({ success: false, message: 'Credenciales incorrectas' });
        }
      } else {
        // El usuario no está ACTIVO
        res.json({ success: false, message: 'Usuario inactivo' });
      }
    } else {
      // Usuario no encontrado
      res.json({ success: false, message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al autenticar usuario:', error.message);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
});







router.get('/perfil', verifyToken, (req, res) => {
 
  const { nombre_usuario, tipo_usuario, foto_usuario,idpersonal,_id} = req.user;
  console.log({ nombre_usuario, tipo_usuario, foto_usuario, idpersonal, _id }); 
  res.json({ nombre_usuario, tipo_usuario, foto_usuario,idpersonal,_id});
});

module.exports = router;
