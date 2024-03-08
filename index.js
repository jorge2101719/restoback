const express = require('express');
const consultas = require('./consultas.js');

const app = express();
const port = 3000;

// Rutas para usuarios
app.get('/usuarios', consultas.obtenerUsuarios);
app.get('/usuarios/:id', consultas.obtenerUsuarioPorId);

// Otras rutas para platos, etc.

// Levantar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
