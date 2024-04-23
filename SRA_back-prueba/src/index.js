const express = require("express");
const cors = require("cors");

const tokenRoute = require("./middlewares/tokenRoute");
const auth = require("./routes/auth");

const usuarios = require("./routes/usuario")
const tipoDocumento = require("./routes/tipoDocumento");
const tipoInstructor = require("./routes/tipoInstructor");
const instructor = require("./routes/instructor");
const competencia = require("./routes/competencia");
const nivelFormacion = require("./routes/nivelFormacion");
const programa = require("./routes/programa");
const programaCompetencia = require("./routes/programaCompetencia");
const etapaFicha = require("./routes/etapaficha");
const resultadoAprendizaje = require("./routes/resultadoAprendizaje");
const competenciaRDA = require("./routes/competenciaResultadoaprendizaje");
const modalidad = require("./routes/modalidad");
const tipoOferta = require("./routes/tipoOferta");
const ficha = require("./routes/ficha");
const programacion = require("./routes/programacion");

const db = require("./db/database");
const e = require("express");
const app = express();
const port = process.env.PORT || 3030;

(async () => {
    try {
        await db.authenticate()
        await db.sync();
        console.log("melos en la base de datos");
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

})()
app.use(express.json());

app.use(cors({
    origin: '*'
}));

app.use('/auth', auth);

app.use('/token', tokenRoute);


app.use('/usuario', usuarios);

app.use('/competencia', competencia);

app.use('/etapaFicha', etapaFicha);

app.use('/modalidad', modalidad);

app.use('/tipoOferta', tipoOferta);

app.use('/tipoDocumento', tipoDocumento);

app.use('/tipoInstructor', tipoInstructor);

app.use('/instructor', instructor);

app.use('/nivelFormacion', nivelFormacion);

app.use('/programa', programa);

app.use('/programaCompetencia', programaCompetencia);

app.use('/resultadoAprendizaje', resultadoAprendizaje);

app.use('/competenciaRda', competenciaRDA);

app.use('/ficha', ficha);

app.use('/programacion', programacion);

app.listen(port, () => {
    console.log("Server trotando en el puerto: ", port);
});