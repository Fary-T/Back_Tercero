const express = require('express');
const router = express.Router();
const db = require('../../db/connection'); // Ajusta la ruta si es necesario

// Traer todos los seguros
//h
router.get('/seguros', (req, res) => {
    db.query('select s.precio, s.nombre, s.descripcion, b.detalle from seguro s, beneficio b, seguro_beneficio sb where s.id_seguro = sb.id_seguro_per and sb.id_beneficio_per = b.id_beneficio', (err, seguros) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener seguros' });
        } else {
            res.json(seguros);
        }
    });
});

module.exports = router;
