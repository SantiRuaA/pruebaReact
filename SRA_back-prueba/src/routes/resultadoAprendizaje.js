const Ra = require('../models/resultadoAprendizaje');
const CompetenciaResultadoaprendizaje = require('../models/competenciaResultadoaprendizaje');
const validateToken = require('../middlewares/tokenFunc');
const router = require('express').Router()

router.use(validateToken)

router.get('/', async (req, res) => {
  const raInst = await Ra.findAll();

  res.json(raInst);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const raInst = await Ra.findByPk(id)

  if (!raInst) {
    return res.json({
      error: "No existe el resultado de aprendizaje"
    });
  }

  res.json(raInst);
});

router.get("/:id/confirmToDelete", async (req, res) => {
  const { id } = req.params;
  const rdaCompetencia = await CompetenciaResultadoaprendizaje.findAll({ where: { idResultadoAprendizaje: id}});
  let estado = true;

  if (rdaCompetencia && rdaCompetencia.length > 0) {
    estado = false;
    return res.json(estado);
  };

  res.json(estado);
});


router.post('/', async (req, res) => {
    const { nomResultadoAprendizaje } = req.body;
    
    if (!nomResultadoAprendizaje) {
        return res.json({
          status: "error",
          msj: "Uno o más campos vacios"
        })
    }
    
    const raExists = await Ra.findOne({ where: { nomResultadoAprendizaje } });
    
    if (raExists) {
        return res.json({
          status: "error",
          msj: 'El resultado de aprendizaje ya existe'
        });
    }

    
    const raInst = await Ra.create({ nomResultadoAprendizaje});
  
    res.json({
        status: 'ok',
        msj: 'resultado de aprendizaje creado con exito',
        Tipo: raInst
    });
  });

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idResultadoAprendizaje, nomResultadoAprendizaje } = req.body;
  const raId = await Ra.findByPk(idResultadoAprendizaje);
  
  if (!nomResultadoAprendizaje) {
    return res.json({
      status: "error",
      msj: "Uno o más campos vacios"
    })
  }

  if (!raId) {
    return res.json({
      status: 'error',
      smj: 'El resultado de aprendizaje a editar no existe'
    });
  }

  await raId.update({ idResultadoAprendizaje, nomResultadoAprendizaje});

  res.json({
    status: 'ok',
    msj: 'resultado de Aprendizaje actualizado con exito',
    Tipo: raId
  });
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const raId = await Ra.findByPk(id);

  if (!raId) {
    return res.json({ msj: 'El resultado de aprendizaje no existe o ya ha sido eliminado' });
  }

  await raId.destroy();

  res.json({
    status: 'ok',
    msj: 'resultado de aprendizaje eliminado con exito',
    Tipo: raId
  });
});

module.exports = router