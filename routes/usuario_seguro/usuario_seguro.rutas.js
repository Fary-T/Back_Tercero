const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//http://localhost:3030/usuario_seguro/
router.post('/', (req, res) => {
    db.query('SELECT * FROM seguros.usuario_seguro', (err, resultado) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al consultar los usuarios' });
        } else {
            res.json(resultado);
        }
    });
});
//http://localhost:3030/usuario_seguro/agregar
router.post('/agregar', (req, res) => {
    const {id_usuario_per,id_seguro_per,fecha_contrato,fecha_fin,estado,estado_pago} = req.body;

    const query = `
        INSERT INTO seguros.usuario_seguro 
        (id_usuario_per, id_seguro_per, fecha_contrato, fecha_fin, estado, estado_pago)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    const valores = [id_usuario_per,id_seguro_per,fecha_contrato,fecha_fin,estado,estado_pago];
    console.log(valores);
    db.query(query, valores, (err, resultado) => {
        if (err) {
            console.error('Error al insertar usuario_seguro:', err);
            res.status(500).json({ error: 'Error al agregar el registro' });
        } else {
            res.status(201).json({ mensaje: 'Registro agregado correctamente', id_insertado: resultado.insertId });
        }
    });
});
module.exports = router;