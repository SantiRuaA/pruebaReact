const { DataTypes } = require("sequelize");
const db = require("../db/database");

const EtapaFicha = db.define('etapaficha', {
  idEtapaFicha: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomEtapa: {
    type: DataTypes.STRING,
  },
});

module.exports = EtapaFicha;