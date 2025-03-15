const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 5000;

// Usamos CORS para permitir todas las solicitudes
app.use(cors());

// Middleware para poder recibir datos en formato JSON
app.use(express.json());

// Configuración de Sequelize para la base de datos PostgreSQL
const sequelize = new Sequelize('icfesdb', 'postgres', 'Linares33*', {
  host: 'localhost',
  dialect: 'postgres',
});

// Conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida correctamente.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

// Definir el modelo para la tabla 'estudiantes'
const Estudiante = sequelize.define('Estudiante', {
  // Define los campos de la tabla (según tu estructura)
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  // Opciones del modelo
  tableName: 'estudiantes', // Nombre de la tabla en la base de datos
  timestamps: false // Si no tienes campos de "createdAt" y "updatedAt"
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del ICFES');
});

// Ruta para agregar un estudiante
app.post('/add-estudiante', async (req, res) => {
  const { nombre, correo, fecha_nacimiento } = req.body;

  try {
    // Insertar estudiante en la base de datos
    const estudiante = await Estudiante.create({
      nombre,
      correo,
      fecha_nacimiento
    });

    res.status(201).send('Estudiante agregado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar estudiante');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
