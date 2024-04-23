const { DataTypes } = require("sequelize");
const db = require("../db/database");

const TipoOferta = db.define('tipoOferta', {
  idTipoOferta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomTipoOferta: {
    type: DataTypes.STRING,
  },
});

module.exports = TipoOferta;