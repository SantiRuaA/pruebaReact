const ProgramaCompetencia = require("../models/programaCompetencia");
const Programa = require("../models/programa");
const Competencia = require("../models/competencia");
const Ficha = require("../models/ficha");
const Programacion = require("../models/programacion");
const validateToken = require('../middlewares/tokenFunc');
const { Op } = require("sequelize");
const router = require("express").Router();

router.use(validateToken);

router.get("/", async (req, res) => {
  const programasCompetencias = await ProgramaCompetencia.findAll();
  res.json({
    ProgramaXCompetencia: programasCompetencias
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const programaCompetencia = await ProgramaCompetencia.findByPk(id);

  if (!programaCompetencia) {
    return res.json({
      status: "error",
      msj: "No existe ninguna asociación programa-competencia con el id proporcionado."
    });
  };

  res.json(programaCompetencia);
});

router.get("/:idPrograma/competencias", async (req, res) => {
  const { idPrograma } = req.params;
  const programaCompetencias = await ProgramaCompetencia.findAll({ where: { idPrograma } });
  
  if (programaCompetencias.length < 1) {
    return res.json({
      status: "error",
      msj: "No hay competencias asociadas al programa con el id proporcionado."
    });
  };

  res.json(programaCompetencias);
});

router.get("/:idPrograma/nomCompetencias", async (req, res) => {
  const { idPrograma } = req.params;

  const programa = await Programa.findOne({ where : { idPrograma: idPrograma } });

  if (!programa) {
    return res.json({
      status: "error",
      msj: "El programa no existe.",
    });
  }

  const idCompetencia = await ProgramaCompetencia.findAll({ 
    where: { idPrograma },
    include: [{ model: Competencia }],
  });

  res.json({
    msj: "Competencias del programa.",
    idCompetencia,
  });

});

router.post("/", async (req, res) => {
  const { idPrograma, idCompetencia } = req.body;

  if (!idPrograma || !idCompetencia) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  };

  const programa = await Programa.findByPk(idPrograma);
  if (!programa) {
    return res.json({
      status: "error",
      msj: "El programa no existe.",
    });
  };

  const competencia = await Competencia.findByPk(idCompetencia);
  if (!competencia) {
    return res.json({
      status: "error",
      msj: "La competencia no existe.",
    });
  };

  const newProgramaCompetencia = await ProgramaCompetencia.create({ idPrograma, idCompetencia });

  res.json({
    status: "ok",
    msj: "Competencia asociada al programa correctamente.",
    idProgramaCompetencia: newProgramaCompetencia.idProgramaCompetencia,
  });

  const programaFicha = await Ficha.findAll({ where: {idPrograma: idPrograma}})

  if (programaFicha && programaFicha.length > 0) {
    const competenciaId = idCompetencia;
    for (ficha of programaFicha) {
      await Programacion.create({ idCompetencia: competenciaId, idFicha: ficha.idFicha });
    };
  };

});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const programaCompetencia = await ProgramaCompetencia.findByPk(id);

  if (!programaCompetencia) {
    return res.json({
      status: "error",
      msj: "No existe ninguna asociación programa-competencia con el id proporcionado."
    });
  };

  await programaCompetencia.destroy();
  res.json({
    status: "ok",
    msj: "Asociación programa-competencia eliminada correctamente.",
  });

  const programaFicha = await Ficha.findAll({ where: {idPrograma: programaCompetencia.idPrograma}})

  if (programaFicha && programaFicha.length > 0) {
    const competenciaId = programaCompetencia.idCompetencia;
    for (ficha of programaFicha) {
      await Programacion.destroy({ where: {idCompetencia: competenciaId, idFicha: ficha.idFicha}});
    };
  };

});

module.exports = router;