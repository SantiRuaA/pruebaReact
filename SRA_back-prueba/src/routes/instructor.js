/* eslint-disable indent */
/* eslint-disable spaced-comment */
const Instructor = require("../models/Instructor");
const TipoDocumento = require("../models/tipoDocumento");
const tipoInstructor = require("../models/tipoInstructor");
const Ficha = require('../models/ficha');
const Programacion = require('../models/programacion');
const router = require("express").Router();


router.get("/", async (req, res) => {
  const instructores = await Instructor.findAll();
  // Modificar cada objeto instructor para incluir una propiedad "nombreCompleto"
  const instructoresConNombreCompleto = instructores.map(instructor => {
    return {
      ...instructor,
      nombreCompleto: `${instructor.nombreInstructor} ${instructor.apellidoInstructor}`
    };
  });
  res.json(instructoresConNombreCompleto);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const instructor = await Instructor.findByPk(id);

  if (!instructor) {
    return res.json({
      status: "error",
      msj: "No existe ningún instructor con el id proporcionado."
    });
  }

  // Añadir la propiedad "nombreCompleto" al instructor
  const instructorConNombreCompleto = {
    ...instructor,
    nombreCompleto: `${instructor.nombreInstructor} ${instructor.apellidoInstructor}`
  };

  res.json(instructorConNombreCompleto);
});

router.get("/:id/confirmToDelete", async (req, res) => {
  const { id } = req.params;
  const instructorFicha = await Ficha.findAll({ where: { idInstructorTecnico: id}});
  const instructorProgramacion = await Programacion.findAll({ where: { idInstructor: id}});
  let estado = true;

  if ((instructorFicha && instructorFicha.length > 0) || (instructorProgramacion && instructorProgramacion.length > 0)) {
    estado = false;
    return res.json(estado);
  };

  res.json(estado);
});

router.post("/", async (req, res) => {
  const { documentoInstructor, nombreInstructor, apellidoInstructor, telefonoInstructor, correoInstructor, idTipoDocumento, idTipoInstructor } = req.body;

  if (!documentoInstructor || !nombreInstructor || !apellidoInstructor || !telefonoInstructor || !correoInstructor || !idTipoDocumento || !idTipoInstructor) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  }

  const instructorExists = await Instructor.findOne({ where: { documentoInstructor } });

  if (instructorExists) {
    return res.json({
      status: "error",
      msj: "El instructor ya existe.",
    });
  }

  const docRegex = new RegExp('^[0-9]{7,10}$');

  if (!docRegex.test(documentoInstructor)) {
    return res.json({
      status: "error",
      msj: "Documento inválido, mínimo 7 y máximo 10 dígitos numéricos.",
    });
  }

  const instructorDoc = await Instructor.findOne({ where: { documentoInstructor } })
  if (instructorDoc) {
    return res.json({
      status: "error",
      msj: "Ya existe un instructor con ese documento."
    });
  }

  const emailRegex = new RegExp('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  if (!emailRegex.test(correoInstructor)) {
    return res.json({
      status: "error",
      msj: "Correo inválido.",
    });
  }

  const emailInstructor = await Instructor.findOne({ where: { correoInstructor } })
  if (emailInstructor) {
    return res.json({
      status: "error",
      msj: "El correo ya está en uso."
    });
  }

  const telRegex = new RegExp('^[0-9]{10,15}$');
  if (!telRegex.test(telefonoInstructor)) {
    return res.json({
      status: "error",
      msj: "Teléfono inválido, debe contener minimo 10 maximo 15 dígitos numéricos.",
    });
  }

  const tipoDoc = await TipoDocumento.findByPk(idTipoDocumento);
  if (!tipoDoc) {
    return res.json({
      status: "error",
      msj: "El tipo de documento no existe."
    });
  }

  const tipoInst = await tipoInstructor.findByPk(idTipoInstructor);
  if (!tipoInst) {
    return res.json({
      status: "error",
      msj: "El tipo de instructor no existe."
    });
  }

  const instructorC = await Instructor.create({ documentoInstructor, nombreInstructor, apellidoInstructor, telefonoInstructor, correoInstructor, idTipoDocumento, idTipoInstructor });

  res.json({
    status: "ok",
    msj: "Instructor creado con exito",
    Instructor: instructorC,
  });
});

/*router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idInstructor, documentoInstructor, nombreInstructor, apellidoInstructor, telefonoInstructor, correoInstructor, idTipoDocumento, idTipoInstructor } = req.body;
  const instId = await Instructor.findByPk(idInstructor);

  if (!nombreInstructor || !apellidoInstructor || !telefonoInstructor || !correoInstructor || !idTipoDocumento || !idTipoInstructor) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  }

  if (!instId) {
    return res.json({
      status: "error",
      msj: "El instructor a editar no existe.",
    });
  }

  const docRegex = new RegExp('^[0-9]{7,10}$');
  if (!docRegex.test(documentoInstructor)) {
    return res.json({
      status: "error",
      msj: "Documento inválido, mínimo 7 y máximo 10 dígitos numéricos.",
    });
  }

  if (documentoInstructor != instId.documentoInstructor) {
    const instExists = await Instructor.findOne({ where: { documentoInstructor } });
    if (instExists) {
      return res.json({
        status: "error",
        msj: "Ya existe un instructor con ese documento."
      });
    }
  }

  const emailRegex = new RegExp('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  if (!emailRegex.test(correoInstructor)) {
    return res.json({
      status: "error",
      msj: "Correo inválido.",
    });
  }

  if (correoInstructor !== instId.correoInstructor) {
    const emailExists = await Instructor.findOne({ where: { correoInstructor } });
    if (emailExists) {
      return res.json({
        status: "error",
        msj: "El correo ya está en uso."
      });
    }
  }

  const telRegex = new RegExp('^[0-9]{10,15}$');
  if (!telRegex.test(telefonoInstructor)) {
    return res.json({
      status: "error",
      msj: "Teléfono inválido, debe contener minimo 10 maximo 15 dígitos numéricos.",
    });
  }

  const tipoDoc = await TipoDocumento.findByPk(idTipoDocumento);
  if (!tipoDoc) {
    return res.json({
      status: "error",
      msj: "El tipo de documento no existe."
    });
  }

  const tipoInst = await tipoInstructor.findByPk(idTipoInstructor);
  if (!tipoInst) {
    return res.json({
      status: "error",
      msj: "El tipo de instructor no existe."
    });
  }

  await instId.update({ idInstructor, documentoInstructor, nombreInstructor, apellidoInstructor, telefonoInstructor, correoInstructor, idTipoDocumento, idTipoInstructor });

  res.json({
    status: "ok",
    msj: "Instructor actualizado con exito",
    Instructor: instId
  });
});*/

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idInstructor, documentoInstructor, nombreInstructor, apellidoInstructor, telefonoInstructor, correoInstructor, idTipoDocumento, idTipoInstructor } = req.body;
  let nuevosDatos = { idInstructor, documentoInstructor, nombreInstructor, apellidoInstructor, telefonoInstructor, correoInstructor, idTipoDocumento, idTipoInstructor }
  nuevosDatos = req.body;

  try {
      const instId = await Instructor.findByPk(id);

      if (!nombreInstructor || !apellidoInstructor || !telefonoInstructor || !correoInstructor || !idTipoDocumento || !idTipoInstructor) {
        return res.json({
          status: "error",
          msj: "Uno o mas campos vacios.",
        });
      }

      if (!instId) {
          return res.status(404).json({
              status: "error",
              msj: "El instructor a editar no existe."
          });
      }

      const docRegex = new RegExp('^[0-9]{7,10}$');
  if (!docRegex.test(documentoInstructor)) {
    return res.json({
      status: "error",
      msj: "Documento inválido, mínimo 7 y máximo 10 dígitos numéricos.",
    });
  }

  if (documentoInstructor != instId.documentoInstructor) {
    const instExists = await Instructor.findOne({ where: { documentoInstructor } });
    if (instExists) {
      return res.json({
        status: "error",
        msj: "Ya existe un instructor con ese documento."
      });
    }
  }

  const emailRegex = new RegExp('^[\\w.%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  if (!emailRegex.test(correoInstructor)) {
    return res.json({
      status: "error",
      msj: "Correo inválido.",
    });
  }

  if (correoInstructor !== instId.correoInstructor) {
    const emailExists = await Instructor.findOne({ where: { correoInstructor } });
    if (emailExists) {
      return res.json({
        status: "error",
        msj: "El correo ya está en uso."
      });
    }
  }

  const telRegex = new RegExp('^[0-9]{10,15}$');
  if (!telRegex.test(telefonoInstructor)) {
    return res.json({
      status: "error",
      msj: "Teléfono inválido, debe contener minimo 10 maximo 15 dígitos numéricos.",
    });
  }

  const tipoDoc = await TipoDocumento.findByPk(idTipoDocumento);
  if (!tipoDoc) {
    return res.json({
      status: "error",
      msj: "El tipo de documento no existe."
    });
  }

  const tipoInst = await tipoInstructor.findByPk(idTipoInstructor);
  if (!tipoInst) {
    return res.json({
      status: "error",
      msj: "El tipo de instructor no existe."
    });
  }

      await instId.update(nuevosDatos);

      return res.json({
          status: "ok",
          msj: "Instructor actualizado con éxito",
          Instructor: instId,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          status: "error",
          msj: "Ocurrió un error al actualizar el instructor."
      });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const instId = await Instructor.findByPk(id);

  if (!instId) {
    return res.json({
      status: "error",
      msj: "El instructor a eliminar no existe.",
    });
  }

  await instId.destroy({ where: { idInstructor: id } });

  res.json({
    status: "ok",
    msj: "Instructor eliminado con exito",
    Instructor: instId
  });
});



module.exports = router
