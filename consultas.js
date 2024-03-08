const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rest_back',
  password: '',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error al conectarse a la base de datos:', err);
  }
  console.log('Conexión a la base de datos exitosa');
  release(); // Liberar el cliente de la base de datos
});

const obtenerUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
};
