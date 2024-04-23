const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Programa = db.define('programa', {
  idPrograma: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigoPrograma: {
    type: DataTypes.STRING,
  },
  versionPrograma: {
    type: DataTypes.STRING,
  },
  nomPrograma: {
    type: DataTypes.STRING,
  },
  redConocimiento: {
    type: DataTypes.STRING,
  },
  codProyecto: {
    type: DataTypes.STRING,
  },
  proyecto: {
    type: DataTypes.STRING,
  },
  idNivelFormacion: {
    type: DataTypes.INTEGER,
  }
});

module.exports = Programa;