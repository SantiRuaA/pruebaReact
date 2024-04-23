const Ficha = require('../models/ficha');
const EtapaFicha = require('../models/EtapaFicha');
const Modalidad = require("../models/modalidad");
const TipoOferta = require("../models/tipoOferta");
const Programa = require("../models/programa");
const Instructor = require("../models/Instructor");
const validateToken = require('../middlewares/tokenFunc');
const router = require('express').Router();

router.use(validateToken);

router.get('/', async (req, res) => {
  const fichas = await Ficha.findAll();
  if (fichas.length === 0) {
    return res.json({
      status: 'error',
      msj: 'No hay programaciones registradas.',
    });
  }
  res.json(fichas);
});

router.get('/lastIdFicha', async (req, res) => {
  const lastFicha = await Ficha.findOne({
    attributes: ['idFicha'],
    order: [['idFicha', 'DESC']]
  });

  if (!lastFicha) {
    return res.json({
      status: 'error',
      msj: 'La programación no existe.',
    });
  };

  res.json(lastFicha.idFicha);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const ficha = await Ficha.findByPk(id);

  if (!ficha) {
    return res.json({
      status: 'error',
      msj: 'La programación no existe con el id proporcionado.',
    });
  }

  res.json(ficha);
});

router.post('/', async (req, res) => {
  const { numeroFicha, duracionFicha, fechaIniLectiva, fechaIniProductiva, fechaFinFormacion, cantidadAprendices, idEtapaFicha, idModalidad, idTipoOferta } = req.body;
  let { idPrograma, idInstructorTecnico } = req.body;

  if (!numeroFicha || !idEtapaFicha || !idModalidad || !idPrograma) {
    return res.json({
      status: 'error',
      msj: 'Uno o mas campos vacios.',
    });
  };

  const fichaNum = await Ficha.findOne({ where: { numeroFicha } });
  if (fichaNum) {
    return res.json({
      status: 'error',
      msj: 'La ficha ya existe.',
    });
  };

  const modalidad = await Modalidad.findByPk(idModalidad);
  if (!modalidad) {
    return res.json({
      status: 'error',
      msj: 'La modalidad no existe.',
    });
  };

  if (idTipoOferta) {
    const tipoOferta = await TipoOferta.findByPk(idTipoOferta);
    if (!tipoOferta) {
      return res.json({
        status: 'error',
        msj: 'El tipo de oferta no existe.',
      });
    };
  };

  const etapaFicha = await EtapaFicha.findByPk(idEtapaFicha);
  if (!etapaFicha) {
    return res.json({
      status: 'error',
      msj: 'La etapa de ficha no existe.',
    });
  };

  const nomPrograma = idPrograma;
  const programa = await Programa.findOne({ where: { nomPrograma } });
  if (!programa) {
    return res.json({
      status: 'error',
      msj: 'El programa no existe.' + idPrograma,
    });
  };
  idPrograma = programa.idPrograma;

  if (idInstructorTecnico == '') {
    idInstructorTecnico = null;
  };

  if (idInstructorTecnico) {
    const documentoInstructor = idInstructorTecnico;
    const instructor = await Instructor.findOne({ where: { documentoInstructor } });
    if (!instructor) {
      return res.json({
        status: 'error',
        msj: 'El instructor no existe.',
      });
    };
    idInstructorTecnico = instructor.idInstructor;
  };

  if (!Number.isInteger(Number(numeroFicha)) || numeroFicha.length < 7 || numeroFicha.length > 10) {
    return res.json({
      status: 'error',
      msj: 'El número de ficha debe ser un número entero de 7 a 10 dígitos.',
    });
  };

  if (duracionFicha) {
    if (duracionFicha.length > 20) {
      return res.json({
        status: 'error',
        msj: 'La duración de la ficha debe ser menor a 20 caracteres.',
      });
    };
  };

  let aprendicesActivos = null;
  if (cantidadAprendices) {
    if (!Number.isInteger(Number(cantidadAprendices)) || cantidadAprendices.length > 3) {
      return res.json({
        status: 'error',
        msj: 'La cantidad de aprendices debe ser un número entero de 3 dígitos.',
      });
    };
    aprendicesActivos = cantidadAprendices;
  };

  if (fechaIniLectiva && fechaIniProductiva) {
    if (fechaIniLectiva > fechaIniProductiva) {
      return res.json({
        status: 'error',
        msj: 'La fecha de inicio lectiva no puede ser mayor a la fecha de inicio productiva.',
      });
    };
  };

  if (fechaIniLectiva && fechaFinFormacion) {
    if (fechaIniLectiva > fechaFinFormacion) {
      return res.json({
        status: 'error',
        msj: 'La fecha de inicio lectiva no puede ser mayor a la fecha de fin de formación.',
      });
    };
  };

  if (fechaIniProductiva && fechaFinFormacion) {
    if (fechaIniProductiva > fechaFinFormacion) {
      return res.json({
        status: 'error',
        msj: 'La fecha de inicio productiva no puede ser mayor a la fecha de fin de formación.',
      });
    };
  };

  const fichaC = await Ficha.create({ numeroFicha, duracionFicha, fechaIniLectiva, fechaIniProductiva, fechaFinFormacion, cantidadAprendices, aprendicesActivos, idEtapaFicha, idModalidad, idTipoOferta, idPrograma, idInstructorTecnico });

  res.json({
    status: 'ok',
    msj: 'Programación creada exitosamente.',
    Ficha: fichaC,
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idFicha, duracionFicha, fechaIniLectiva, fechaIniProductiva, fechaFinFormacion, cantidadAprendices, retiroAprendices, idEtapaFicha, idModalidad, idTipoOferta } = req.body;
  let { idInstructorTecnico } = req.body;
  const fichaId = await Ficha.findByPk(idFicha);

  if (!idEtapaFicha || !idModalidad ) {
    return res.json({
      status: 'error',
      msj: 'Uno o mas campos vacios.',
    });
  };

  if (!idFicha) {
    return res.json({
      status: 'error',
      msj: 'La programación no existe con el id proporcionado.',
    });
  };

  const modalidad = await Modalidad.findByPk(idModalidad);
  if (!modalidad) {
    return res.json({
      status: 'error',
      msj: 'La modalidad no existe.',
    });
  };

  if (idTipoOferta) {
    const tipoOferta = await TipoOferta.findByPk(idTipoOferta);
    if (!tipoOferta) {
      return res.json({
        status: 'error',
        msj: 'El tipo de oferta no existe.',
      });
    };
  };

  const etapaFicha = await EtapaFicha.findByPk(idEtapaFicha);
  if (!etapaFicha) {
    return res.json({
      status: 'error',
      msj: 'La etapa de ficha no existe.',
    });
  };

  if (idInstructorTecnico == '') {
    idInstructorTecnico = null;
  };

  if (idInstructorTecnico) {
    const documentoInstructor = idInstructorTecnico;
    const instructor = await Instructor.findOne({ where: { documentoInstructor } });
    if (!instructor) {
      return res.json({
        status: 'error',
        msj: 'El instructor no existe.',
      });
    };
    idInstructorTecnico = instructor.idInstructor;
  };

  if (duracionFicha) {
    if (duracionFicha.length > 20) {
      return res.json({
        status: 'error',
        msj: 'La duración de la ficha debe ser menor a 20 caracteres.',
      });
    };
  };

  let aprendicesActivos = 0;
  if (cantidadAprendices) {
    if (!Number.isInteger(Number(cantidadAprendices)) || cantidadAprendices.length > 3) {
      return res.json({
        status: 'error',
        msj: 'La cantidad de aprendices debe ser un número entero de 3 dígitos.',
      });
    };
  };

  if (retiroAprendices) {
    if (!Number.isInteger(Number(retiroAprendices)) || retiroAprendices.length > 3 || parseInt(retiroAprendices) > parseInt(cantidadAprendices)) {
      return res.json({
        status: 'error',
        msj: 'La cantidad de aprendices retirados debe ser un número entero de máximo 3 dígitos y menor a la cantidad de aprendices activos.',
      });
    };
    aprendicesActivos = parseInt(cantidadAprendices) - parseInt(retiroAprendices);
  };
  aprendicesActivos = aprendicesActivos.toString();

  if (fechaIniLectiva && fechaIniProductiva) {
    if (fechaIniLectiva > fechaIniProductiva) {
      return res.json({
        status: 'error',
        msj: 'La fecha de inicio lectiva no puede ser mayor a la fecha de inicio productiva.',
      });
    };
  };

  if (fechaIniLectiva && fechaFinFormacion) {
    if (fechaIniLectiva > fechaFinFormacion) {
      return res.json({
        status: 'error',
        msj: 'La fecha de inicio lectiva no puede ser mayor a la fecha de fin de formación.',
      });
    };
  };

  if (fechaIniProductiva && fechaFinFormacion) {
    if (fechaIniProductiva > fechaFinFormacion) {
      return res.json({
        status: 'error',
        msj: 'La fecha de inicio productiva no puede ser mayor a la fecha de fin de formación.',
      });
    };
  };

  await fichaId.update({ duracionFicha, fechaIniLectiva, fechaIniProductiva, fechaFinFormacion, cantidadAprendices, retiroAprendices, aprendicesActivos, idEtapaFicha, idModalidad, idTipoOferta, idInstructorTecnico });

  res.json({
    status: 'ok',
    msj: 'Programación actualizada exitosamente.',
    Ficha: fichaId,
  });

});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const fichaId = await Ficha.findByPk(id);

  if (!fichaId) {
    return res.json({
      status: 'error',
      msj: 'La programación a eliminar no existe.'
    });
  };

  await fichaId.destroy();

  res.json({
    status: 'ok',
    msj: 'La programación ha sido eliminada exitosamente.'
  });
});

module.exports = router;