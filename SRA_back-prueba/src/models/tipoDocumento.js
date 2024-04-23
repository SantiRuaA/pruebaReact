const { DataTypes } = require("sequelize");
const db = require("../db/database");

const TipoDocumento = db.define('tipodocumento', {
  idTipoDocumento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nomTipoDocumento: {
    type: DataTypes.STRING,
  },
});

module.exports = TipoDocumento;