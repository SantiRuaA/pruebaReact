const Programacion = require('../models/programacion');
const Competencia = require('../models/competencia');
const Instructor = require('../models/instructor');
const Ficha = require('../models/ficha');
const validateToken = require('../middlewares/tokenFunc');
const router = require("express").Router();

router.use(validateToken);

router.get("/", async (req, res) => {
  const programaciones = await Programacion.findAll();
  res.json(programaciones);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const programacion = await Programacion.findByPk(id);

  if (!programacion) {
    return res.json({
      status: "error",
      msj: "No existe ninguna Programacion con el id proporcionado."
    });
  }

  res.json(programacion);
});

router.get("/:idFicha/competencias", async (req, res) => {
  const { idFicha } = req.params;
  const programaciones = await Programacion.findAll({ where: { idFicha } });

  if (programaciones.length < 1) {
    return res.json({
      status: "error",
      msj: "No hay competencias asociadas a la ficha con el id proporcionado."
    });
  };

  res.json(programaciones);
});

router.get("/:idInstructor/instructor", async (req, res) => {
  const { idInstructor } = req.params;
  const programaciones = await Programacion.findAll({ where: { idInstructor } });

  if (programaciones.length < 1) {
    return res.json({
      status: "error",
      msj: "No hay programaciones asociadas al instructor con el id proporcionado."
    });
  };
  res.json(programaciones);
});

router.post("/", async (req, res) => {
  const { fechaIniCompetencia, fechaFinCompetencia, idCompetencia, idFicha } = req.body;
  let { idInstructor } = req.body;

  if (!idCompetencia || !idFicha) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  };

  const competencia = await Competencia.findByPk(idCompetencia);
  if (!competencia) {
    return res.json({
      status: "error",
      msj: "La competencia no existe.",
    });
  };

  if (idInstructor == '') {
    idInstructor = null;
  };

  if (idInstructor) {
    const documentoInstructor = idInstructor;
    const instructor = await Instructor.findOne({ where: { documentoInstructor } });
    if (!instructor) {
      return res.json({
        status: 'error',
        msj: 'El instructor no existe.',
      });
    };
    idInstructor = instructor.idInstructor;
  };

  if (fechaIniCompetencia == '') {
    fechaIniCompetencia = null;
  };

  if (fechaFinCompetencia == '') {
    fechaFinCompetencia = null;
  };

  const ficha = await Ficha.findByPk(idFicha);
  if (!ficha) {
    return res.json({
      status: "error",
      msj: "La ficha no existe.",
    });
  };

  const programacion = await Programacion.create({ fechaIniCompetencia, fechaFinCompetencia, idCompetencia, idInstructor, idFicha });

  res.json(programacion);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { idProgramacionCompetencia, fechaIniCompetencia, fechaFinCompetencia, idCompetencia, idFicha } = req.body;
  let { idInstructor } = req.body;
  const programacionCompetenciaId = await Programacion.findByPk(idProgramacionCompetencia);

  if (!idProgramacionCompetencia || !idCompetencia || !idFicha) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  };

  if(!programacionCompetenciaId) {
    return res.json({
      status: "error",
      msj: "La programacion no existe con el id proporcionado.",
    });
  };

  const competencia = await Competencia.findByPk(idCompetencia);
  if (!competencia) {
    return res.json({
      status: "error",
      msj: "La competencia no existe.",
    });
  };

  if (idInstructor == '') {
    idInstructor = null;
  };

  if (idInstructor) {
    const documentoInstructor = idInstructor;
    const instructor = await Instructor.findOne({ where: { documentoInstructor } });
    if (!instructor) {
      return res.json({
        status: 'error',
        msj: 'El instructor no existe.',
      });
    };
    idInstructor = instructor.idInstructor;
  };
  

  const ficha = await Ficha.findByPk(idFicha);
  if (!ficha) {
    return res.json({
      status: "error",
      msj: "La ficha no existe.",
    });
  };

  await programacionCompetenciaId.update({ fechaIniCompetencia, fechaFinCompetencia, idCompetencia, idInstructor, idFicha });

  res.json(programacionCompetenciaId);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const programacion = await Programacion.findByPk(id);

  if (!programacion) {
    return res.json({
      status: "error",
      msj: "No existe ninguna programacion con el id proporcionado."
    });
  };

  await programacion.destroy();

  res.json({
    status: "ok",
    msj: "Programacion eliminada correctamente.",
  });
});

module.exports = router;