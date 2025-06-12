const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//http://localhost:3030/usuario/
router.post('/', (req, res) => {
    db.query('SELECT * FROM usuario', (err, resultado) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al consultar los usuarios' });
        } else {
            res.json(resultado);
        }
    });
});

// http://localhost:3030/usuario/agregar
router.post('/agregar', (req, res) => {
  const { correo, username, password, nombre, apellido, tipo, activo, cedula, telefono, rol } = req.body;

  if (!correo || !username || !password || !nombre || !apellido  || !cedula || !telefono || !rol) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  console.log("Este es el tipo:",tipo);
  const sql = 'INSERT INTO usuario (correo, username, password, nombre, apellido, tipo, activo, cedula, telefono, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [correo, username, cedula, nombre, apellido, tipo, activo, cedula, telefono, rol], (err, resultado) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al agregar el usuario' });
    } else {
      res.status(201).json({ mensaje: 'Usuario agregado exitosamente', id: resultado.insertId });
    }
  });
});


module.exports = router;

/*
POST -> enviar datos (crear)
GET -> leer datos
PUT -> actualizar datos
DELETE -> eliminar datos
**
*/