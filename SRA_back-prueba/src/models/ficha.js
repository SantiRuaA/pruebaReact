const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Ficha = db.define('ficha', {
  idFicha: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numeroFicha: {
    type: DataTypes.STRING,
  },
  duracionFicha: {
    type: DataTypes.STRING,
  },
  fechaIniLectiva: {
    type: DataTypes.STRING,
  },
  fechaIniProductiva: {
    type: DataTypes.STRING,
  },
  fechaFinFormacion: {
    type: DataTypes.STRING,
  },
  cantidadAprendices: {
    type: DataTypes.STRING,
  },
  retiroAprendices: {
    type: DataTypes.STRING,
  },
  aprendicesActivos: {
    type: DataTypes.STRING,
  },
  idEtapaFicha: {
    type: DataTypes.INTEGER,
  },
  idModalidad: {
    type: DataTypes.INTEGER,
  },
  idTipoOferta: {
    type: DataTypes.INTEGER,
  },
  idPrograma: {
    type: DataTypes.INTEGER,
  },
  idInstructorTecnico: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Ficha;