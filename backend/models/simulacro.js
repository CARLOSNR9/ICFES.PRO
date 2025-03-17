const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Asegúrate de que el archivo db.js esté configurado correctamente

const Simulacro = sequelize.define('Simulacro', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'simulacros', // Asegúrate de que el nombre de la tabla sea correcto
  timestamps: false
});

module.exports = Simulacro;

