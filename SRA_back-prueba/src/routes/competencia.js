const Competencia = require('../models/competencia');
const ProgramaCompetencia = require('../models/programaCompetencia')
const validateToken = require('../middlewares/tokenFunc');
const router = require('express').Router()

router.use(validateToken);

router.get('/', async (req, res) => {
  const competencias = await Competencia.findAll();
  res.json(competencias);
});

router.get("/:id/confirmToDelete", async (req, res) => {
  const { id } = req.params;
  const programaCompetencia = await ProgramaCompetencia.findAll({ where: { idCompetencia: id}});
  let estado = true;

  if (programaCompetencia && programaCompetencia.length > 0) {
    estado = false;
    return res.json(estado);
  };

  res.json(estado);
});

router.get('/lastIdCompetencia', async (req, res) => {
  const lastCompetencia = await Competencia.findOne({
    attributes: ['idCompetencia'],
    order: [['idCompetencia', 'DESC']]
  });
  if (!lastCompetencia) {
    return res.json({
      status: 'error',
      msj: 'No hay ninguna competencia registrada.',
    });
  }
  res.json(lastCompetencia.idCompetencia);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const competencia = await Competencia.findByPk(id)

  if (!competencia) {
    return res.json({
      status: 'error',
      msj: 'No existe ninguna competencia con el id proporcionado.'
    });
  }

  res.json(competencia);
});

router.post('/', async (req, res) => {
  const { nombreCompetencia, norma, codigoNorma } = req.body;

  if (!nombreCompetencia || !norma || !codigoNorma) {
    return res.json({
      status: 'error',
      msj: 'Uno o mas campos vacios.',
    });
  }

  const competenciaNom = await Competencia.findOne({ where: { nombreCompetencia } });
  if (competenciaNom) {
    return res.json({
      status: 'error',
      msj: 'La competencia ya existe.',
    });
  };

  const competenciaCod = await Competencia.findOne({ where: { codigoNorma } });
  if (competenciaCod) {
    return res.json({
      status: 'error',
      msj: 'El código de la competencia ya existe.',
    });
  };

  const competenciaNorma = await Competencia.findOne({ where: { norma } });
  if (competenciaNorma) {
    return res.json({
      status: 'error',
      msj: 'La norma de la competencia ya existe.',
    });
  };

  const competenciaC = await Competencia.create({ nombreCompetencia, norma, codigoNorma })

  res.json({
    status: 'ok',
    msj: 'Competencia creada exitosamente.',
    competenciaC
  });

});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idCompetencia, nombreCompetencia, norma, codigoNorma } = req.body;
  const competenciaId = await Competencia.findByPk(idCompetencia);

  if (!nombreCompetencia || !norma || !codigoNorma) {
    return res.json({
      status: 'error',
      msj: 'Uno o mas campos vacios.',
    });
  }

  if (!competenciaId) {
    return res.json({
      status: 'error',
      msj: 'La competencia a editar no existe.'
    });
  }

  if (nombreCompetencia != competenciaId.nombreCompetencia) {
    const competenciaNom = await Competencia.findOne({ where: { nombreCompetencia } });
    if (competenciaNom) {
      return res.json({
        status: 'error',
        msj: 'La competencia ya existe.',
      });
    };
  }

  if (codigoNorma != competenciaId.codigoNorma) {
    const competenciaCod = await Competencia.findOne({ where: { codigoNorma } });
    if (competenciaCod) {
      return res.json({
        status: 'error',
        msj: 'El código de la competencia ya existe.',
      });
    };
  }

  if (norma != competenciaId.norma) {
    const competenciaNorma = await Competencia.findOne({ where: { norma } });
    if (competenciaNorma) {
      return res.json({
        status: 'error',
        msj: 'La norma de la competencia ya existe.',
      });
    };
  }

  await competenciaId.update({
    idCompetencia,
    nombreCompetencia,
    norma,
    codigoNorma,
  });

  res.json({
    status: 'ok',
    msj: 'La competencia ha sido actualizada exitosamente.'
  });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const idCom = await Competencia.findByPk(id);

  if (!id) {
    return res.json({
      status: 'error',
      msj: 'La competencia no existe.',
    });
  }

  await idCom.destroy();

  res.json({
    status: 'ok',
    msj: 'Competencia elimanda con exito.'
  });
});


module.exports = router