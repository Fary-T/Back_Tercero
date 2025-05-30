const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//http://localhost:3030/seguro/
router.get('/', (req, res) => {
    db.query('SELECT * FROM seguro', (err, resultado) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al consultar los usuarios' });
        } else {
            res.json(resultado);
        }
    });
});

//http://localhost:3030/seguro/agregar
router.post('/agregar', (req, res) => {
    const { nombre, precio, tiempo_pago, descripcion, tipo } = req.body;

    if (!nombre || !precio || !tiempo_pago || !descripcion || !tipo) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const sql = 'INSERT INTO seguro (nombre, precio, tiempo_pago, descripcion, tipo) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre, precio, tiempo_pago, descripcion, tipo], (err, resultado) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al agregar el usuario' });
        } else {
            res.status(201).json({ mensaje: 'Usuario agregado exitosamente', id: resultado.insertId });
        }
    });
});

module.exports = router;