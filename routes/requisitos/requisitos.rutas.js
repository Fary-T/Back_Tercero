const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// http://localhost:3030/requisitos/
router.post('/', (req, res) => {
    db.query('SELECT * FROM requisito_seguro', (err, resultado) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al consultar los requisitos' });
        } else {
            res.json(resultado);
        }
    });
});

// http://localhost:3030/requisitos/documentos
router.get('/', (req, res) => {
    const query = `
            SELECT 
            rs.id_requisito_seguro AS id,
            r.nombre,
            CASE WHEN rs.validado = ? THEN 'validado' ELSE 'pendiente' END AS estado,
            rs.id_usuario_seguro_per AS id_usuario_seguro,
            rs.id_requisito_per
            FROM requisito_seguro rs
            JOIN requisito r ON rs.id_requisito_per = r.id_requisito
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al consultar documentos:", err);
            return res.status(500).json({ error: "Error al consultar documentos" });
        }
        res.json(results);
    });
});
module.exports = router;