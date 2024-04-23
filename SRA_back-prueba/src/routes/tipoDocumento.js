const TipoDocumento = require('../models/tipoDocumento');
const validateToken = require('../middlewares/tokenFunc');
const router = require('express').Router()

router.use(validateToken)


router.get('/', async (req, res) => {
  const tipoDocClts = await TipoDocumento.findAll();

  res.json(tipoDocClts);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoDocClt = await TipoDocumento.findByPk(id)

  if (!tipoDocClt) {
    return res.json({
      error: "No existe el tipo de documento"
    });
  }

  res.json(tipoDocClt);
});


router.post('/', async (req, res) => {
  const { nomTipoDocumento } = req.body;

  if (!nomTipoDocumento) {
    return res.json({
      error: "Uno o más campos vacios"
    })
  }

  const tipoExists = await TipoDocumento.findOne({ where: { nomTipoDocumento } });

  if (tipoExists) {
    return res.json({
      error: 'El tipo de documento ya existe'
    });
  }

  const tipoDocClt = await TipoDocumento.create(req.body);

  res.json({
    msj: 'TipoDocumento creado con exito',
    Tipo: tipoDocClt
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoDocumento.findByPk(id);
  const { nomTipoDocumento, ...resto } = req.body;

  if (!nomTipoDocumento) {
    return res.json({
      error: "Uno o más campos vacios"
    })
  }

  if (!tipoId) {
    return res.json({ msj: 'El tipo de documento no existe' });
  }


  const tipoExists = await TipoDocumento.findOne({ where: { nomTipoDocumento } });

  if (tipoExists) {
    return res.json({
      error: 'El tipo de documento ya existe'
    });
  }

  await tipoId.update({ nomTipoDocumento, ...resto });

  res.json({
    msj: 'TipoDocumento actualizado con exito',
    Tipo: tipoId
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await TipoDocumento.findByPk(id);

  if (!tipoId) {
    return res.json({ msj: 'El tipo de documento no existe o ya ha sido eliminado' });
  }

  await tipoId.destroy();

  res.json({
    msj: 'TipoDocumento eliminado con exito',
    Tipo: tipoId
  });
});

module.exports = router