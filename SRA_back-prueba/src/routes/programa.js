const Programa = require("../models/programa");
const NivelFormacion = require("../models/nivelFormacion");
const Ficha = require("../models/ficha");
const validateToken = require('../middlewares/tokenFunc');
const router = require("express").Router();

router.use(validateToken);

router.get("/", async (req, res) => {
  const programas = await Programa.findAll();
  res.json(programas);
});

router.get("/lastIdPrograma", async (req, res) => {
  const lastPrograma = await Programa.findOne({
    attributes: ['idPrograma'],
    order: [['idPrograma', 'DESC']]
  });

  if (!lastPrograma) {
    return res.json({
      status: "error",
      msj: "No hay ningún programa registrado.",
    });
  };

  res.json(lastPrograma.idPrograma);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const programa = await Programa.findByPk(id);

  if (!programa) {
    return res.json({
      status: "error",
      msj: "No existe ningun programa con el id proporcionado."
    });
  };

  res.json(programa);
});

router.get("/:id/confirmToDelete", async (req, res) => {
  const { id } = req.params;
  const programaFicha = await Ficha.findAll({ where: { idPrograma: id}});
  let estado = true;

  if (programaFicha && programaFicha.length > 0) {
    estado = false;
    return res.json(estado);
  };

  res.json(estado);
});

router.post("/", async (req, res) => {
  const { codigoPrograma, versionPrograma, nomPrograma, redConocimiento, codProyecto, proyecto, idNivelFormacion } = req.body;

  if (!codigoPrograma || !versionPrograma || !nomPrograma || !redConocimiento ||!codProyecto || !proyecto || !idNivelFormacion) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  };

  const programaCod = await Programa.findOne({ where: { codigoPrograma } });
  if (programaCod) {
    return res.json({
      status: "error",
      msj: "El código del programa ya está asociado al programa " + programaCod.nomPrograma + ".",
    });
  };

  const programaNom = await Programa.findOne({ where: { nomPrograma } });
  if (programaNom) {
    return res.json({
      status: "error",
      msj: "El programa ya existe.",
    });
  };

  const nivelFormacion = await NivelFormacion.findByPk(idNivelFormacion);
  if (!nivelFormacion) {
    return res.json({
      status: "error",
      msj: "El nivel de formación no existe.",
    });
  };

  if (codigoPrograma.length > 7 || codigoPrograma.length < 1 || !Number.isInteger(Number(codigoPrograma))) {
    return res.json({
      status: "error",
      msj: "El código del programa debe ser un número de 1 a 6 dígitos.",
    });
  };

  if (versionPrograma.length > 3 || versionPrograma.length < 1 || !Number.isInteger(Number(versionPrograma))) {
    return res.json({
      status: "error",
      msj: "La versión del programa debe ser un número de 1 a 2 dígitos.",
    });
  };

  if (codProyecto.length > 7 || codProyecto.length < 1 || !Number.isInteger(Number(codProyecto))) {
    return res.json({
      status: "error",
      msj: "El código del proyecto debe ser un número de 1 a 6 dígitos.",
    });
  };

  const programaC = await Programa.create({ codigoPrograma, versionPrograma, nomPrograma, redConocimiento, codProyecto, proyecto, idNivelFormacion });

  res.json({
    status: "ok",
    msj: "Programa creado exitosamente.",
    programaC
  });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { idPrograma, codigoPrograma, versionPrograma, nomPrograma, redConocimiento, codProyecto, proyecto, idNivelFormacion } = req.body;
  const programa = await Programa.findByPk(idPrograma);

  if (!codigoPrograma || !versionPrograma || !nomPrograma || !redConocimiento ||!codProyecto || !proyecto || !idNivelFormacion) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  };

  if (!idPrograma) {
    return res.json({
      status: "error",
      msj: "El programa no existe.",
    });
  };

  if (codigoPrograma != programa.codigoPrograma) {
    const programaCod = await Programa.findOne({ where: { codigoPrograma } });
    if (programaCod) {
      return res.json({
        status: "error",
        msj: "El código del programa ya existe.",
      });
    };
  };

  if (nomPrograma != programa.nomPrograma) {
    const programaNom = await Programa.findOne({ where: { nomPrograma } });
    if (programaNom) {
      return res.json({
        status: "error",
        msj: "El programa ya existe.",
      });
    };
  };

  const nivelFormacion = await NivelFormacion.findByPk(idNivelFormacion);
  if (!nivelFormacion) {
    return res.json({
      status: "error",
      msj: "El nivel de formación no existe.",
    });
  };

  if (codigoPrograma.length > 7 || codigoPrograma.length < 1 || !Number.isInteger(Number(codigoPrograma))) {
    return res.json({
      status: "error",
      msj: "El código del programa debe ser un número de 1 a 6 dígitos.",
    });
  };

  if (versionPrograma.length > 3 || versionPrograma.length < 1 || !Number.isInteger(Number(versionPrograma))) {
    return res.json({
      status: "error",
      msj: "La versión del programa debe ser un número de 1 a 2 dígitos.",
    });
  };

  const programaU = await programa.update({ codigoPrograma, versionPrograma, nomPrograma, redConocimiento, codProyecto, proyecto, idNivelFormacion });

  res.json({
    status: "ok",
    msj: "Programa actualizado exitosamente."
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const programa = await Programa.findByPk(id);

  if (!id) {
    return res.json({
      status: "error",
      msj: "El programa no existe.",
    });
  };

  await programa.destroy();

  res.json({
    status: "ok",
    msj: "Programa eliminado exitosamente.",
  });
});

module.exports = router;