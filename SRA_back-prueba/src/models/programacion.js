const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Programacion = db.define('programacion', {
  idProgramacionCompetencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaIniCompetencia: {
    type: DataTypes.STRING,
  },
  fechaFinCompetencia: {
    type: DataTypes.STRING,
  },
  idCompetencia: {
    type: DataTypes.INTEGER,
  },
  idInstructor: {
    type: DataTypes.INTEGER,
  },
  idFicha: {
    type: DataTypes.INTEGER,
  }
});

module.exports = Programacion;