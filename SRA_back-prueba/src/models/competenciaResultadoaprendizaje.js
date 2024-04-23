const { DataTypes } = require('sequelize');
const db = require('../db/database');
const Competencia = require('./competencia');
const Ra = require('./resultadoAprendizaje');

const CompetenciaResultadoaprendizaje = db.define('competenciaresultadoaprendizaje', {
  idCompetenciaResultadoaprendizaje: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idCompetencia: {
    type: DataTypes.INTEGER,
  },
  idResultadoAprendizaje: {
    type: DataTypes.INTEGER,
  },
});
CompetenciaResultadoaprendizaje.belongsTo(Competencia, { foreignKey: 'idCompetencia' });
CompetenciaResultadoaprendizaje.belongsTo(Ra, { foreignKey: 'idResultadoAprendizaje' })

module.exports = CompetenciaResultadoaprendizaje;