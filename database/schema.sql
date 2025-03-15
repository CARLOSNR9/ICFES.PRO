-- Crear la base de datos si aún no está creada
CREATE DATABASE icfesdb;

-- Conectarse a la base de datos
\c icfesdb;

-- Crear tablas necesarias para los estudiantes, exámenes y resultados

-- Tabla de estudiantes
CREATE TABLE estudiantes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de exámenes
CREATE TABLE examenes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  fecha TIMESTAMP NOT NULL
);

-- Tabla de resultados de los exámenes
CREATE TABLE resultados (
  id SERIAL PRIMARY KEY,
  estudiante_id INTEGER REFERENCES estudiantes(id),
  examen_id INTEGER REFERENCES examenes(id),
  puntaje DECIMAL(5, 2),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para el registro de preguntas
CREATE TABLE preguntas (
  id SERIAL PRIMARY KEY,
  examen_id INTEGER REFERENCES examenes(id),
  pregunta TEXT NOT NULL,
  respuesta_correcta TEXT NOT NULL,
  opciones JSONB
);

-- Insertar algunos datos de ejemplo
INSERT INTO estudiantes (nombre, email, fecha_nacimiento) VALUES ('Juan Pérez', 'juanperez@mail.com', '2000-01-01');
INSERT INTO examenes (nombre, descripcion, fecha) VALUES ('Examen de Matemáticas', 'Examen de nivelación de matemáticas', '2025-05-01');
INSERT INTO resultados (estudiante_id, examen_id, puntaje) VALUES (1, 1, 85.5);

