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

// PUT http://localhost:3030/seguro/editar/:id
router.put('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, tiempo_pago, descripcion, tipo } = req.body;

    if (!nombre || !precio || !tiempo_pago || !descripcion || !tipo) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const sql = `
        UPDATE seguro 
        SET nombre = ?, precio = ?, tiempo_pago = ?, descripcion = ?, tipo = ?
        WHERE id_seguro = ?
    `;
    db.query(sql, [nombre, precio, tiempo_pago, descripcion, tipo, id], (err, resultado) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al editar el seguro' });
        }
        res.json({ mensaje: 'Seguro actualizado correctamente' });
    });
});

// DELETE http://localhost:3030/seguro/eliminar/:id
router.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM seguro WHERE id_seguro = ?';
    db.query(sql, [id], (err, resultado) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al eliminar el seguro' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: 'Seguro no encontrado' });
        }

        res.json({ mensaje: 'Seguro eliminado correctamente' });
    });
});

module.exports = router;