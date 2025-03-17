const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');  // Asegúrate de tener la conexión a la base de datos en un archivo llamado db.js

const Estudiante = sequelize.define('Estudiante', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Estudiante;
