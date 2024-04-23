const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Ra = db.define('resultadoaprendizaje', {
  idResultadoAprendizaje: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomResultadoAprendizaje: {
    type: DataTypes.BIGINT,
  },
});

module.exports = Ra;