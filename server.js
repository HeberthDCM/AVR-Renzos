
/**
 * ESTE ARCHIVO DEBE EJECUTARSE LOCALMENTE CON NODE.JS
 * Requiere: npm install express mysql2 cors body-parser
 */
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// CONFIGURA AQUÍ TUS DATOS DE MYSQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',      // Tu usuario de MySQL
  password: '',      // Tu contraseña de MySQL
  database: 'renzoserp' // Tu base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL local');
});

// API para Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ? AND active = 1';
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length > 0) {
      const user = results[0];
      // En una app real, aquí buscarías los permisos en otra tabla
      res.json({
        user: { id: user.id, username: user.username, fullName: user.fullName, role: user.role, active: true },
        permissions: [] // Debes consultar tu tabla de permisos aquí
      });
    } else {
      res.status(401).send('Usuario o contraseña incorrectos');
    }
  });
});

// API para obtener Cajas
app.get('/api/cajas', (req, res) => {
  db.query('SELECT * FROM cajas', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// API para registrar Movimiento
app.post('/api/movimientos', (req, res) => {
  const { tipo, monto, concepto, usuarioId, cajaId, observaciones } = req.body;
  const query = 'INSERT INTO movimientos (tipo, monto, concepto, usuarioId, cajaId, observaciones, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())';
  db.query(query, [tipo, monto, concepto, usuarioId, cajaId, observaciones], (err, results) => {
    if (err) return res.status(500).send(err);
    
    // Actualizar saldo de la caja
    const sign = (tipo === 'ingreso' || tipo === 'ajuste') ? '+' : '-';
    db.query(`UPDATE cajas SET saldo = saldo ${sign} ? WHERE id = ?`, [monto, cajaId]);
    
    res.json({ success: true, id: results.insertId });
  });
});

app.listen(3000, () => {
  console.log('Servidor ERP corriendo en http://localhost:3000');
});
