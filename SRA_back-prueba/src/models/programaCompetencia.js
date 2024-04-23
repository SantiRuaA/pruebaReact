const { DataTypes } = require("sequelize");
const db = require("../db/database");
const Programa = require("./programa");
const Competencia = require("./competencia");

const ProgramaCompetencia = db.define('programacompetencia', {
  idProgramaCompetencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idPrograma: {
    type: DataTypes.INTEGER,
  },
  idCompetencia: {
    type: DataTypes.INTEGER,
  }
});

ProgramaCompetencia.belongsTo(Programa, { foreignKey: 'idPrograma' });
ProgramaCompetencia.belongsTo(Competencia, { foreignKey: 'idCompetencia' });


module.exports = ProgramaCompetencia;