const { DataTypes } = require("sequelize");
const db = require("../db/database");

const Modalidad = db.define('modalidad', {
  idModalidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nomModalidad: {
    type: DataTypes.STRING,
  },
});

module.exports = Modalidad;