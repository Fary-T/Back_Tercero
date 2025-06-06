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
    const { id_usuario_per, id_seguro_per, fecha_contrato, fecha_fin, estado, estado_pago } = req.body;
    
    // Validación de campos requeridos
    if (!id_usuario_per || !id_seguro_per || !fecha_contrato || !fecha_fin) {
        return res.status(400).json({ 
            error: 'Faltan datos requeridos',
            received: { id_usuario_per, id_seguro_per, fecha_contrato, fecha_fin, estado, estado_pago }
        });
    }
    
    // Establecer valores por defecto si no se proporcionan
    const estadoFinal = estado !== undefined ? estado : 1; // 1 = activo por defecto
    const estadoPagoFinal = estado_pago !== undefined ? estado_pago : 0; // 0 = pendiente por defecto
    
    // Consulta SQL corregida para insertar en la tabla correspondiente
    const sql = `INSERT INTO contratos_seguro (id_usuario_per, id_seguro_per, fecha_contrato, fecha_fin, estado, estado_pago) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(sql, [id_usuario_per, id_seguro_per, fecha_contrato, fecha_fin, estadoFinal, estadoPagoFinal], (err, resultado) => {
        if (err) {
            console.error('Error al insertar contrato de seguro:', err);
            res.status(500).json({ error: 'Error al agregar el contrato de seguro' });
        } else {
            res.status(201).json({ 
                mensaje: 'Contrato de seguro agregado exitosamente', 
                id: resultado.insertId,
                contrato: {
                    id: resultado.insertId,
                    id_usuario_per,
                    id_seguro_per,
                    fecha_contrato,
                    fecha_fin,
                    estado: estadoFinal,
                    estado_pago: estadoPagoFinal
                }
            });
        }
    });
});
module.exports = router;