const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const validateToken = require('../middlewares/tokenFunc');
const router = require('express').Router()

router.use(validateToken);

router.get('/', async (req, res) => {
  const users = await Usuario.findAll({
    attributes: {
      exclude: ['contrasenaUsuario']
    }
  });

  if (users.length === 0) {
    return res.json({
      status: 'error',
      msj: 'No hay usuarios registrados.',
    });
  }

  res.json(users);
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await Usuario.findByPk(id, {
    attributes: {
      exclude: ['contrasenaUsuario']
    }
  });

  if (!user) {
    return res.json({
      status: "error",
      msj: "No existe ningun usuario con el id proporcionado."
    });
  }

  res.json(user);
});

router.post('/', async (req, res) => {
  const { idUsuario, nombreUsuario, correoUsuario, contrasenaUsuario} = req.body;

  if (!nombreUsuario || !correoUsuario || !contrasenaUsuario) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",

    });
  }

  const emailRegex = new RegExp('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  if (!emailRegex.test(correoUsuario)) {
    return res.json({
      status: "error",
      msj: "Correo inválido.",
    });
  }

  const emailUser = await Usuario.findOne({ where: { correoUsuario } })
  if (emailUser) {
    return res.json({
      status: "error",
      msj: "El correo ya está en uso."
    });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d)(?=.*[!@#$%^&+=?.:,"°~;_¿¡*/{}|<>()]).{8,}$/;
  if (!passwordRegex.test(contrasenaUsuario)) {
    return res.json({
      status: "error",
      msj: "La contraseña debe contener mínimo: 8 caracteres, una minúscula, una mayúscula, 3 números y 1 caracter especial.",
    });
  }

  const salt = bcryptjs.genSaltSync();
  const pwdEncrypt = bcryptjs.hashSync(contrasenaUsuario, salt);

  const userC = await Usuario.create({ idUsuario, nombreUsuario, correoUsuario, contrasenaUsuario: pwdEncrypt,})

  res.json({
    status: 'ok',
    msj: 'Usuario creado exitosamente.'
  });
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idUsuario, nombreUsuario, correoUsuario, contrasenaUsuario} = req.body;
  const userId = await Usuario.findByPk(idUsuario);


  if (!nombreUsuario || !correoUsuario ) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios."
    });
  }

  if (!userId) {
    return res.json({
      status: "error",
      msj: 'El usuario a editar no existe.'
    });
  }

  const emailRegex = new RegExp('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  if (!emailRegex.test(correoUsuario)) {
    return res.json({
      status: "error",
      msj: "Correo inválido.",
    });
  }

  if (correoUsuario != userId.correoUsuario) {
    const emailExists = await Usuario.findOne({ where: { correoUsuario } });
    if (emailExists) {
      return res.json({
        status: "error",
        msj: "El correo ya está en uso."
      });
    }
  }

  const salt = await bcryptjs.genSalt();
  let hashPwd = contrasenaUsuario;

  if (contrasenaUsuario) { 
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d.*\d)(?=.*[!@#$%^&+=?.:,"°~;_¿¡*/{}|<>()]).{8,}$/;

    if (!passwordRegex.test(contrasenaUsuario)) {
      return res.json({
        status: "error",
        msj: "La contraseña debe contener mínimo: 8 caracteres, una minúscula, una mayúscula, 3 números y 1 caracter especial."
      });
    }

    const currentPassword = userId.contrasenaUsuario;
    const isMatch = bcryptjs.compareSync(contrasenaUsuario, currentPassword);

    if (isMatch) {
      return res.json({
        status: "error",
        msj: "La nueva contraseña debe ser diferente a la contraseña actual."
      });
    }

    hashPwd = await bcryptjs.hash(contrasenaUsuario, salt);
  }

  await userId.update({
    idUsuario,
    nombreUsuario,
    correoUsuario,
    contrasenaUsuario: hashPwd || userId.contrasenaUsuario  
  });

  res.json({
    status: 'ok',
    msj: 'El usuario ha sido actualizado exitosamente.'
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = await Usuario.findByPk(id);

  if (!userId) {
    return res.json({
      status: 'error',
      msj: 'El usuario no existe o ya ha sido eliminado.',
    });
  }

  await userId.destroy();

  res.json({
    status: 'ok',
    msj: 'Usuario eliminado con exito.'
  });
});

module.exports = router