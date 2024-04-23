const TipoOferta = require("../models/tipoOferta");
const validateToken = require('../middlewares/tokenFunc');
const router = require("express").Router();

router.use(validateToken);

router.get("/", async (req, res) => {
  const tiposOferta = await TipoOferta.findAll();
  res.json(tiposOferta);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tipoOferta = await TipoOferta.findByPk(id);

  if (!tipoOferta) {
    return res.json({
      status: "error",
      msj: "No existe ningun tipo de oferta con el id proporcionado.",
    });
  }

  res.json(tipoOferta);
});

router.post("/", async (req, res) => {
  const { idTipoOferta, nomTipoOferta } = req.body;

  if (!nomTipoOferta) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  }



  const tipoOfertaC = await TipoOferta.create({ idTipoOferta, nomTipoOferta });

  res.json({
    status: "ok",
    msj: "Tipo de oferta creada exitosamente.",
  });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { idTipoOferta, nomTipoOferta } = req.body;
  const tipoOfertaId = await TipoOferta.findByPk(idTipoOferta);

  if (!nomTipoOferta) {
    return res.json({
      status: "error",
      msj: "Uno o mas campos vacios.",
    });
  }

  if (!tipoOfertaId) {
    return res.json({
      status: "error",
      msj: "No existe ningun tipo de oferta con el id proporcionado.",
    });
  }

  await tipoOfertaId.update({ idTipoOferta, nomTipoOferta });

  res.json({
    status: "ok",
    msj: "Tipo de oferta actualizada exitosamente.",
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const tipoOferta = await TipoOferta.findByPk(id);

  if (!tipoOferta) {
    return res.json({
      status: "error",
      msj: "No existe ningun tipo de oferta con el id proporcionado.",
    });
  }

  await tipoOferta.destroy({ where: { idTipoOferta: id } });

  res.json({
    status: "ok",
    msj: "Tipo de oferta eliminada exitosamente.",
  });
});

module.exports = router;