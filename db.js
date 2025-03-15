const { Pool } = require('pg');

// Crear la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',          // Nombre de usuario de PostgreSQL
  host: 'localhost',         // Dirección del servidor de la base de datos
  database: 'icfesdb',       // Nombre de la base de datos que creaste
  password: 'Linares33*', // Tu contraseña de PostgreSQL
  port: 5432,                // Puerto predeterminado de PostgreSQL
});

// Exportar la conexión
module.exports = pool;
