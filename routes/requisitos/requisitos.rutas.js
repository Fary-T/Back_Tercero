const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// http://localhost:3030/requisitos/:id_usuario
router.get('/:id_usuario', (req, res) => {
    const id_usuario = req.params.id_usuario;

    console.log("ID del usuario:", id_usuario);

    if (!id_usuario) {
        return res.status(400).json({ error: 'Falta el id_usuario en la ruta' });
    }

    const query = `
            SELECT 
                us.id_usuario_seguro,
                sr.id_seguro_requisito,
                s.id_seguro,
                s.nombre AS nombre_seguro,
                s.precio,
                s.tiempo_pago,
                s.descripcion,
                r.nombre AS nombre_requisito,
                r.detalle
            FROM usuario u
            INNER JOIN usuario_seguro us ON u.id_usuario = us.id_usuario_per
            INNER JOIN seguro s ON s.id_seguro = us.id_seguro_per
            INNER JOIN seguro_requisito sr ON sr.id_seguro_per = s.id_seguro
            INNER JOIN requisito r ON r.id_requisito = sr.id_requisito_per
            WHERE u.id_usuario = ?;
    `;

    db.query(query, [id_usuario], (err, resultado) => {
        if (err) {
            console.error('Error al consultar los requisitos del seguro:', err);
            return res.status(500).json({ error: 'Error al consultar los requisitos' });
        }

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron requisitos para el usuario' });
        }

        res.status(200).json(resultado);
    });
});

module.exports = router;