const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// http://localhost:3030/requisitos/usuario-seguro/:idUsuario
router.get('/usuario-seguro/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    
    const query = `
        SELECT 
            s.id_seguro,
            us.id_usuario_seguro,
            s.nombre AS nombre_seguro,
            s.precio,
            s.tiempo_pago,
            s.descripcion
        FROM usuario u 
        LEFT JOIN usuario_seguro us ON u.id_usuario = us.id_usuario_per  
        INNER JOIN seguro s ON s.id_seguro = us.id_seguro_per 
        WHERE u.id_usuario = ?;
    `;

    db.query(query, [idUsuario], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al consultar los seguros del usuario' });
        }
        res.json(resultados);
    });
});

// http://localhost:3030/requisitos/requisitos-seguro
router.post('/requisitos-seguro', (req, res) => {
    const { id_seguro } = req.body;

    if (!id_seguro) {
        return res.status(400).json({ error: 'Falta el id_seguro en el body' });
    }

    const query = `
        SELECT 
            sr.id_seguro_requisito, 
            s.nombre AS nombre_seguro,
            s.precio,
            s.tiempo_pago,
            s.descripcion AS descripcion_seguro,
            r.nombre AS nombre_requisito,
            r.detalle AS detalle_requisito,
            r.id_requisito
        FROM 
            seguro_requisito sr
        INNER JOIN 
            seguro s ON sr.id_seguro_per = s.id_seguro
        INNER JOIN 
            requisito r ON sr.id_requisito_per = r.id_requisito
        WHERE 
            s.id_seguro = ?;
    `;

    db.query(query, [id_seguro], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al consultar los requisitos' });
        }
        res.json(resultados);
    });
});

module.exports = router;