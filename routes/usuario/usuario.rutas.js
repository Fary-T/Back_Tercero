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

  if (!correo || !username || !password || !nombre || !apellido  || !activo || !cedula || !telefono || !rol) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }
  console.log("Este es el tipo:",tipo);
  const sql = 'INSERT INTO usuario (correo, username, password, nombre, apellido, tipo, activo, cedula, telefono, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [correo, username, password, nombre, apellido, tipo, activo, cedula, telefono, rol], (err, resultado) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al agregar el usuario' });
    } else {
      res.status(201).json({ mensaje: 'Usuario agregado exitosamente', id: resultado.insertId });
    }
  });
});

// http://localhost:3030/usuario/eliminar/:id
router.delete('/eliminar/:id', (req, res) => {
  const  id  = req.params.id;
 console.log(id);
  const sql = 'DELETE FROM usuario WHERE id_usuario = ?';

  db.query(sql, [id], (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  });
});

// http://localhost:3030/usuario/editar/:id
router.put('/editar/:id', (req, res) => {
  const id = req.params.id;
  const { correo, username, password, nombre, apellido, tipo, activo, cedula, telefono, rol } = req.body;

  if (!correo || !username || !password || !nombre || !apellido || !activo || !cedula || !telefono || !rol) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const sql = `
    UPDATE usuario
    SET correo = ?, username = ?, password = ?, nombre = ?, apellido = ?, tipo = ?, activo = ?, cedula = ?, telefono = ?, rol = ?
    WHERE id_usuario = ?
  `;

  db.query(sql, [correo, username, password, nombre, apellido, tipo, activo, cedula, telefono, rol, id], (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  });
});

  if (!correo || !username || !password || !nombre || !apellido || !activo || !cedula || !telefono || !rol) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const sql = `
    UPDATE usuario
    SET correo = ?, username = ?, password = ?, nombre = ?, apellido = ?, tipo = ?, activo = ?, cedula = ?, telefono = ?, rol = ?
    WHERE id_usuario = ?
  `;

  db.query(sql, [correo, username, password, nombre, apellido, tipo, activo, cedula, telefono, rol, id], (err, resultado) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({ mensaje: 'Usuario actualizado exitosamente' });
  });
});
module.exports = router;


/*
POST -> enviar datos (crear)
GET -> leer datos
PUT -> actualizar datos
DELETE -> eliminar datos
*/