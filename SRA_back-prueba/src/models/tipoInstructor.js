const { DataTypes } = require("sequelize");
const db = require("../db/database");

const TipoTnstructor = db.define('tipoinstructor', {
  idTipoInstructor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nomTipoInstructor: {
    type: DataTypes.STRING,
  },
});

module.exports = TipoTnstructor;