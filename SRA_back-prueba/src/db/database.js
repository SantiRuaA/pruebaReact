const { Sequelize } = require("sequelize");

 const db = new Sequelize('sra', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

module.exports = db;