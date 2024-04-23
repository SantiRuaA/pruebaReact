const tipoinstructor = require('../models/tipoInstructor');
const validateToken = require('../middlewares/tokenFunc');
const router = require('express').Router()

router.use(validateToken)


router.get('/', async (req, res) => {
  const tipoInsts = await tipoinstructor.findAll();

  res.json(tipoInsts);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoInst = await tipoinstructor.findByPk(id)

  if (!tipoInst) {
    return res.json({
      error: "No existe el tipo de instructor"
    });
  }

  res.json(tipoInst);
});


router.post('/', async (req, res) => {
    const { nomTipoInstructor } = req.body;
    
    if (!nomTipoInstructor) {
        return res.json({
        error: "Uno o más campos vacios"
        })
    }
    
    const tipoExists = await tipoinstructor.findOne({ where: { nomTipoInstructor } });
    
    if (tipoExists) {
        return res.json({
        error: 'El tipo de instructor ya existe'
        });
    }
    
    const tipoInst = await tipoinstructor.create(req.body);
    
    res.json({
        msj: 'TipoInstructor creado con exito',
        Tipo: tipoInst
    });
    });

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await tipoinstructor.findByPk(id);
  const { nomTipoInstructor, ...resto } = req.body;

  if (!nomTipoInstructor) {
    return res.json({
      error: "Uno o más campos vacios"
    })
  }

  if (!tipoId) {
    return res.json({ msj: 'El tipo de instructor no existe' });
  }


  const tipoExists = await tipoinstructor.findOne({ where: { nomTipoInstructor } });

  if (tipoExists) {
    return res.json({
      error: 'El tipo de instructor ya existe'
    });
  }

  await tipoId.update({ nomTipoInstructor, ...resto });

  res.json({
    msj: 'TipoInstructor actualizado con exito',
    Tipo: tipoId
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const tipoId = await tipoinstructor.findByPk(id);

  if (!tipoId) {
    return res.json({ msj: 'El tipo de instructor no existe o ya ha sido eliminado' });
  }

  await tipoId.destroy();

  res.json({
    msj: 'TipoInstructor eliminado con exito',
    Tipo: tipoId
  });
});

module.exports = router