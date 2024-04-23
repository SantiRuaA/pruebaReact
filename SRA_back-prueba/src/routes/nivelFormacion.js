const NivelFormacion = require('../models/nivelFormacion');
const validateToken = require('../middlewares/tokenFunc');
const router = require('express').Router();

router.use(validateToken);

router.get('/', async (req, res) => {
  const nivelesFormacion = await NivelFormacion.findAll();

  res.json(nivelesFormacion);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const nivelFormacion = await NivelFormacion.findByPk(id);

  if (!nivelFormacion) {
    return res.json({
      error: "No existe el nivel de formacion"
    });
  }

  res.json(nivelFormacion);
});

router.post('/', async (req, res) => {
  const { nomNivelFormacion } = req.body;

  if (!nomNivelFormacion) {
    return res.json({
      error: "Uno o más campos vacios"
    });
  };

  const nivelFormacion = await NivelFormacion.create(req.body);

  res.json({
    msj: 'Nivel de formación creado con exito',
    Tipo: nivelFormacion
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const nivelId = await NivelFormacion.findByPk(id);
  const { nomNivelFormacion, ...resto } = req.body;

  if (!nomNivelFormacion) {
    return res.json({
      error: "Uno o más campos vacios"
    });
  };

  if (!nivelId) {
    return res.json({
      error: "No existe el nivel de formacion"
    });
  };

  const nivelFormacion = await NivelFormacion.update(req.body, {
    where: { idNivelFormacion: id }
  });

  res.json({
    msj: 'Nivel de formación actualizado con exito',
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const nivelId = await NivelFormacion.findByPk(id);

  if (!nivelId) {
    return res.json({
      error: "No existe el nivel de formacion"
    });
  };

  await NivelFormacion.destroy({
    where: { idNivelFormacion: id }
  });

  res.json({
    msj: 'Nivel de formación eliminado con exito',
  });
});

module.exports = router;
