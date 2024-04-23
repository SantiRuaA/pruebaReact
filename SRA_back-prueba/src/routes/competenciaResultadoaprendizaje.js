const CompetenciaResultadoaprendizaje = require('../models/competenciaResultadoaprendizaje');
const Competencia = require('../models/competencia');
const Ra = require('../models/resultadoAprendizaje');
const validateToken = require('../middlewares/tokenFunc');
const router = require("express").Router();

router.use(validateToken);

router.get("/", async (req, res) => {
    const competenciaRDA = await CompetenciaResultadoaprendizaje.findAll();
    res.json({
        competenciaRdaX:competenciaRDA,
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const competenciaRDA = await CompetenciaResultadoaprendizaje.findByPk(id);
    if(!competenciaRDA){
        return res.json({
            status: 'error',
            msj: "No existe ninguna asociación competencia-RDA con el id proporcionado."
        });
    }

    res.json(competenciaRDA);
});

router.get('/:idCompetencia/rda', async (req, res) => {
    const { idCompetencia } = req.params;
    const competenciaRDA = await CompetenciaResultadoaprendizaje.findAll({where: { idCompetencia } });
    if (competenciaRDA.length < 1){
        return res.json({
            status: "error",
            msj: "No hay RDA asociadas al programa con el id proporcionado."
        });
    };
    res.json(competenciaRDA);

});

router.get('/:idCompetencia/nomRda', async (req, res) => {
    const { idCompetencia } = req.params;
    const competencia = await Competencia.findOne({ where: { idCompetencia:idCompetencia } });

    if (!competencia) {
        return res.json({
            status: "error",
            msj: "La competencia no existe.",
        });
    };

    const idRDA = await CompetenciaResultadoaprendizaje.findAll({
        where: { idCompetencia },
        include: [{ model: Ra }],
    });

    res.json({
        msj: "RDA de la competencia.",
        idRDA,
    });

});

router.post("/", async (req, res) => {
    const { idCompetencia, idResultadoAprendizaje } = req.body;

    if (!idCompetencia || !idResultadoAprendizaje) {
        return res.json({
            status: "error",
            msj: "Uno o mas campos vacios.",
        });
    };

    const competencia = await Competencia.findByPk(idCompetencia);
    if (!competencia) {
        return res.json({
        status: "error",
        msj: "La competencia no existe.",
        });
    };

    const resultadoAprendizaje = await Ra.findByPk(idResultadoAprendizaje);
    if (!resultadoAprendizaje) {
        return res.json({
            status: "error",
            msj: "El resultado de aprendizaje no existe.",
        });
    };

    const newCompetenciaRDA = await CompetenciaResultadoaprendizaje.create({ idCompetencia, idResultadoAprendizaje });
    res.json({
        status: "ok",
        msj: "Resultado de aprendizaje asociado a la competencia correctamente.",
        idCompetenciaResultadoaprendizaje: newCompetenciaRDA.idCompetenciaResultadoaprendizaje,
    });
});

router.delete('/:id', async (req, res) =>{
    const { id } =req.params;
    const competenciaRDA = await CompetenciaResultadoaprendizaje.findByPk(id)

    if (!competenciaRDA){
        return res.json({
            status: 'error',
            msj: 'No  ninguna asociación competencia-RDA con el id proporcionado.'
        });
    }

    await competenciaRDA.destroy();
    res.json({
        status: 'ok',
        msj: 'Asociación competencia-RDA eliminada correctamente.'
    });
});

module.exports = router;