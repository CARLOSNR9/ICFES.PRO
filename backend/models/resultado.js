const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');  // Asegúrate de tener la conexión a la base de datos
const Estudiante = require('./estudiante');
const Simulacro = require('./simulacro');

const Resultado = sequelize.define('Resultado', {
  puntaje: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
});

// Definir las relaciones
Estudiante.hasMany(Resultado, { foreignKey: 'estudiante_id' });
Resultado.belongsTo(Estudiante, { foreignKey: 'estudiante_id' });

Simulacro.hasMany(Resultado, { foreignKey: 'simulacro_id' });
Resultado.belongsTo(Simulacro, { foreignKey: 'simulacro_id' });

module.exports = Resultado;
