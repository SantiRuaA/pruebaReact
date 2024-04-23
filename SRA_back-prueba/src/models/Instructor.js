const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Instructor = db.define('instructor', {
  idInstructor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  documentoInstructor: {
    type: DataTypes.BIGINT,
  },
  nombreInstructor: {
    type: DataTypes.STRING,
  },
  apellidoInstructor: {
    type: DataTypes.STRING,
  },
  telefonoInstructor: {
    type: DataTypes.STRING,
  },
  correoInstructor: {
    type: DataTypes.STRING,
  },
  idTipoDocumento: {
    type: DataTypes.INTEGER,
  },
  idTipoInstructor: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Instructor;