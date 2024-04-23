const transporter = require('../middlewares/mailer');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { generateJWT } = require('../helpers/generateJWT');
const router = require('express').Router();

const fs = require('fs');
const path = require('path');

const leerPlantillaCorreo = () => {
  const rutaPlantilla = path.join(__dirname, '../templates', 'forgotMail.html');
  return fs.readFileSync(rutaPlantilla, 'utf-8');
};

function generarContrasena() {
  const minusculas = 'abcdefghijklmnopqrstuvwxyz';
  const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const especiales = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
  const todas = minusculas + mayusculas + especiales;

  let contrasena = '';
  contrasena += minusculas[Math.floor(Math.random() * minusculas.length)];
  contrasena += mayusculas[Math.floor(Math.random() * mayusculas.length)];
  contrasena += especiales[Math.floor(Math.random() * especiales.length)];

  for (let i = 0; i < 5; i++) {
    contrasena += todas[Math.floor(Math.random() * todas.length)];
  }

  contrasena = contrasena.split('').sort(function () { return 0.5 - Math.random() }).join('');

  return contrasena;
}

router.post('/login', async (req, res) => {

  const { correoUsuario, contrasenaUsuario } = req.body;

  if (!correoUsuario || !contrasenaUsuario) {
    return res.json({
      status: "error",
      msj: "Correo y/o contraseña vacios."
    });
  }

  const user = await Usuario.findOne({ where: { correoUsuario } });

  try {
    if (!user) {
      return res.json({
        status: "error",
        msj: "Correo y/o contraseña incorrectos."
      });
    }

    const validPassword = bcryptjs.compareSync(contrasenaUsuario, user.contrasenaUsuario);
    if (!validPassword) {
      return res.json({
        status: "error",
        msj: "Correo y/o contraseña incorrectos."
      });
    }

    const token = await generateJWT(user.idUsuario);

    user.contrasenaUsuario = undefined;

    res.json({
      status: "ok",
      msj: "User comprobao 🥶", user, token
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      msj: 'Error en el servidor.'
    });
  }

});
router.post('/forgot-pwd', async (req, res) => {
  const { correoUsuario } = req.body;

  if (!correoUsuario) {
    return res.json({
      status: "error",
      msj: "Todos los campos son requeridos."
    });
  }

  const user = await Usuario.findOne({ where: { correoUsuario } });

  try {
    if (!user) {
      return res.json({
        status: "error",
        msj: "Credenciales incorrectas."
      });
    }

    const nuevaContrasena = generarContrasena();

    const salt = bcryptjs.genSaltSync();
    const pwdEncrypt = bcryptjs.hashSync(nuevaContrasena, salt);

    user.contrasenaUsuario = pwdEncrypt;
    await user.save();



    let plantillaCorreo = leerPlantillaCorreo();

    plantillaCorreo = plantillaCorreo.replace(/{NEW_PASSWORD}/g, nuevaContrasena);

    await transporter.sendMail({
      from: '"SRA" <srua2005@gmail.com>',
      to: user.correoUsuario,
      subject: "Restablecer contraseña",
      html: plantillaCorreo,
    });

    return res.json({
      status: "ok",
      msj: "Hemos enviado un correo electrónico a tu cuenta con una nueva contraseña.",
    });

  } catch (error) {
    return res.json({
      status: 'error',
      msj: 'Ha ocurrido un error al recuperar tu contraseña. Por favor, inténtalo nuevamente.',
    });
  }
});

router.post('/new-pwd', async (req, res) => {
  const { newPwd, token } = req.body;

  if (!newPwd || !token) {
    return res.json({
      status: "error",
      msj: "Todos los campos son requeridos."
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET);

    const userId = decodedToken.uid;

    const user = await Usuario.findByPk(userId);
    if (!user) {
      return res.json({
        status: "error",
        msj: "Usuario no encontrado."
      });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d)(?=.*[!@#$%^&+=?.:,"°~;_¿¡*/{}|<>()]).{8,}$/;
    if (!passwordRegex.test(newPwd)) {
      return res.json({
        status: "error",
        msj: "La contraseña debe contener mínimo: 8 caracteres, una minúscula, una mayúscula, 3 números y 1 caracter especial.",
      });
    }

    const currentPwd = user.contrasenaUsuario;
    const isMatch = bcryptjs.compareSync(newPwd, currentPwd);

    if (isMatch) {
      return res.json({
        status: "error",
        msj: "La nueva contraseña debe ser diferente a la contraseña actual."
      });
    }

    const salt = await bcryptjs.genSalt();
    const hashedPwd = await bcryptjs.hash(newPwd, salt);

    user.contrasenaUsuario = hashedPwd;
    await user.save();

    return res.json({
      status: "ok",
      msj: "Contraseña actualizada, vuelve a ingresar al sistema."
    });

  } catch (error) {
    return res.json({
      status: 'error',
      msj: 'Ha ocurrido un error al cambiar tu contraseña. Por favor, inténtalo nuevamente o solicita un nuevo correo.',
    });
  }
});

module.exports = router