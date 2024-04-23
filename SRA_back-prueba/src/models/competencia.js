const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Competencia = db.define('competencia', {
  idCompetencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreCompetencia: {
    type: DataTypes.STRING,
  },
  norma: {
    type: DataTypes.STRING,
  },
  codigoNorma: {
    type: DataTypes.STRING,
  }
});

module.exports = Competencia;