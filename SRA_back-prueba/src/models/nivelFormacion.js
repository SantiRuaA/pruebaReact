const { DataTypes } = require("sequelize");
const db = require("../db/database");

const NivelFormacion = db.define('nivelformacion', {
  idNivelFormacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomNivelFormacion: {
    type: DataTypes.STRING,
  }
});

module.exports = NivelFormacion;