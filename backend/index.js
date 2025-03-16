const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

// Crear la aplicación express
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
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    // Sincronizar los modelos con la base de datos
    sequelize.sync();  // Aquí sincronizamos todos los modelos
  })
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

// Definir el modelo para la tabla 'estudiantes'
const Estudiante = sequelize.define('Estudiante', {
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
  tableName: 'estudiantes',
  timestamps: false
});

// Definir el modelo para la tabla 'simulacros'
const Simulacro = sequelize.define('Simulacro', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'simulacros',
  timestamps: false
});

// Definir el modelo para la tabla 'resultados'
const Resultado = sequelize.define('Resultado', {
  puntaje: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }
}, {
  tableName: 'resultados',
  timestamps: false
});

// Relaciones (1 a muchos)
Estudiante.hasMany(Resultado, { foreignKey: 'estudiante_id' });
Resultado.belongsTo(Estudiante, { foreignKey: 'estudiante_id' });

Simulacro.hasMany(Resultado, { foreignKey: 'simulacro_id' });
Resultado.belongsTo(Simulacro, { foreignKey: 'simulacro_id' });

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del ICFES');
});

// Ruta para agregar un estudiante
app.post('/add-estudiante', async (req, res) => {
  const { nombre, correo, fecha_nacimiento } = req.body;

  try {
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




// Ruta para agregar un simulacro
app.post('/add-simulacro', async (req, res) => {
  const { nombre, descripcion, fecha } = req.body;

  try {
    // Verifica si la fecha se proporciona, de lo contrario, usa la fecha actual
    const simulacro = await Simulacro.create({
      nombre,
      descripcion,
      fecha: fecha || new Date()  // Si no se pasa fecha, asigna la fecha actual
    });

    res.status(201).send('Simulacro agregado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar simulacro');
  }
});



// Ruta para agregar un resultado
app.post('/add-resultado', async (req, res) => {
  const { estudiante_id, simulacro_id, puntaje } = req.body;

  try {
    const resultado = await Resultado.create({
      estudiante_id,
      simulacro_id,
      puntaje
    });

    res.status(201).send('Resultado agregado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar resultado');
  }
});




// Obtener todos los resultados de un estudiante
app.get('/resultados-estudiante/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const resultados = await Resultado.findAll({
      where: { estudiante_id: id },
      include: [Estudiante, Simulacro] // Incluye los modelos relacionados
    });
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los resultados del estudiante');
  }
});

// Obtener todos los resultados de un simulacro
app.get('/resultados-simulacro/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const resultados = await Resultado.findAll({
      where: { simulacro_id: id },
      include: [Estudiante, Simulacro] // Incluye los modelos relacionados
    });
    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los resultados del simulacro');
  }
});





// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
