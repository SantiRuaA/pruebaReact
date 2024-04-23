const EtapaFicha = require("../models/EtapaFicha");
const validateToken = require('../middlewares/tokenFunc');
const router = require("express").Router();

router.use(validateToken);

router.get("/", async (req, res) => {
  const etapasFicha = await EtapaFicha.findAll();
  res.json(etapasFicha);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const etapaFicha = await EtapaFicha.findByPk(id);

  if (!etapaFicha) {
    return res.json({
      status: "error",
      msj: "No existe ninguna etapa de ficha con el id proporcionado.",
    });
  }

  res.json(etapaFicha);
});

router.post("/", async (req, res) => {
  const { idEtapaFicha, nomEtapa } = req.body;

  if (!nomEtapa) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  }

  const existingEtapaFicha = await EtapaFicha.findOne({ where: { idEtapaFicha } });

  if (existingEtapaFicha) {
    return res.json({
      status: "error",
      msj: "Ya existe un registro con el mismo ID.",
    });
  }

  const etapaFichaC = await EtapaFicha.create({ idEtapaFicha, nomEtapa });

  res.json({
    status: "ok",
    msj: "Etapa de ficha creada exitosamente.",
  });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { idEtapaFicha, nomEtapa } = req.body;
  const etapaFichaId = await EtapaFicha.findByPk(idEtapaFicha);

  if (!nomEtapa) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  }

  if (!etapaFichaId) {
    return res.json({
      status: "error",
      msj: "No existe ninguna etapa de ficha con el id proporcionado.",
    });
  }

  await etapaFichaId.update({ idEtapaFicha, nomEtapa });

  res.json({
    status: "ok",
    msj: "Etapa de ficha actualizada exitosamente.",
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const etapaFichaId = await EtapaFicha.findByPk(id);

  if (!etapaFichaId) {
    return res.json({
      status: "error",
      msj: "No existe ninguna etapa de ficha con el id proporcionado.",
    });
  }

  await etapaFichaId.destroy({ where: { idEtapaFicha: id } });

  res.json({
    status: "ok",
    msj: "Etapa de ficha eliminada exitosamente.",
  });
});

module.exports = router;