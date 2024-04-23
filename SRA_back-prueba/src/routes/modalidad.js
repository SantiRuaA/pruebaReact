const Modalidad = require("../models/modalidad");
const validateToken = require('../middlewares/tokenFunc');
const router = require("express").Router();

router.use(validateToken);

router.get("/", async (req, res) => {
  const modalidades = await Modalidad.findAll();
  res.json(modalidades);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const modalidad = await Modalidad.findByPk(id);

  if (!modalidad) {
    return res.json({
      status: "error",
      msj: "No existe ninguna modalidad con el id proporcionado.",
    });
  }

  res.json(modalidad);
});

router.post("/", async (req, res) => {
  const { idModalidad, nomModalidad } = req.body;

  if (!nomModalidad) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  }


  const modalidadC = await Modalidad.create({ idModalidad, nomModalidad });

  res.json({
    status: "ok",
    msj: "Modalidad creada exitosamente.",
  });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { idModalidad, nomModalidad } = req.body;
  const modalidadId = await Modalidad.findByPk(idModalidad);

  if (!nomModalidad) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  }

  if (!modalidadId) {
    return res.json({
      status: "error",
      msj: "No existe ninguna modalidad con el id proporcionado.",
    });
  }

  await modalidadId.update({ idModalidad, nomModalidad });

  res.json({
    status: "ok",
    msj: "Modalidad actualizada exitosamente.",
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const modalidad = await Modalidad.findByPk(id);

  if (!modalidad) {
    return res.json({
      status: "error",
      msj: "No existe ninguna modalidad con el id proporcionado.",
    });
  }

  await modalidad.destroy();

  res.json({
    status: "ok",
    msj: "Modalidad eliminada exitosamente.",
  });
});

module.exports = router;