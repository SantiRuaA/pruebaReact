const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Usuario = db.define('usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreUsuario: {
    type: DataTypes.STRING,
  },
  correoUsuario: {
    type: DataTypes.STRING,
    unique: true,
  },
  contrasenaUsuario: {
    type: DataTypes.STRING,
  },
});

module.exports = Usuario;