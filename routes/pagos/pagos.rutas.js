const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

// GET http://localhost:3030/pagos
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT us.fecha_contrato, us.fecha_fin, u.nombre AS nombre_usuario, 
             s.nombre AS nombre_seguro, s.precio, 
             ps.fecha_pago, ps.cantidad, ps.comprobante_pago
      FROM usuario_seguro us 
      INNER JOIN usuario u ON us.id_usuario_per = u.id_usuario
      INNER JOIN seguro s ON us.id_seguro_per = s.id_seguro
      INNER JOIN pago_seguro ps ON us.id_usuario_seguro = ps.id_usuario_seguro_per
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error ejecutando la consulta:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }

      res.status(200).json(results);
    });

  } catch (error) {
    console.error("Error general:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// GET http://localhost:3030/pagos/:id_usuario
router.get('/:id_usuario', (req, res) => {
  const id_usuario = req.params.id_usuario;

  if (!id_usuario) {
    return res.status(400).json({ error: 'Falta el id_usuario en la ruta' });
  }

  const query = `
    SELECT 
      us.id_usuario_seguro, 
      us.fecha_contrato, 
      us.fecha_fin, 
      u.nombre, 
      s.nombre AS nombre_seguro, 
      s.tiempo_pago,
      s.precio,
      ps.fecha_pago, 
      ps.cantidad, 
      ps.comprobante_pago  
    FROM usuario_seguro us 
    INNER JOIN usuario u ON us.id_usuario_per = u.id_usuario
    INNER JOIN seguro s ON us.id_seguro_per = s.id_seguro
    LEFT JOIN pago_seguro ps ON us.id_usuario_seguro = ps.id_usuario_seguro_per
    WHERE u.id_usuario = ?;
  `;

  db.query(query, [id_usuario], (err, result) => {
    if (err) {
      console.error('Error en la consulta de pagos:', err);
      return res.status(500).json({ error: 'Error al obtener los pagos del usuario' });
    }

    if (result.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron pagos para este usuario' });
    }

    res.status(200).json(result);
  });
});

// POST http://localhost:3030/pagos/clientes
router.post("/clientes", async (req, res) => {
  const { id_usuario, fecha_pago } = req.body;

  if (!id_usuario || !fecha_pago) {
    return res.status(400).json({ error: "Faltan datos requeridos (id_usuario o fecha_pago)" });
  }

  try {
    const queryDatos = `
      SELECT us.id_usuario_seguro AS id_usuario_seguro_per, s.precio
      FROM usuario_seguro us
      INNER JOIN seguro s ON us.id_seguro_per = s.id_seguro
      WHERE us.id_usuario_per = ?
      LIMIT 1;
    `;

    db.query(queryDatos, [id_usuario], (err, resultados) => {
      if (err) {
        console.error("Error al consultar seguro del usuario:", err);
        return res.status(500).json({ error: "Error al obtener los datos del seguro" });
      }

      if (resultados.length === 0) {
        return res.status(404).json({ error: "No se encontró un seguro asociado al usuario" });
      }

      const { id_usuario_seguro_per, precio } = resultados[0];

      const insertQuery = `
        INSERT INTO pago_seguro (id_usuario_seguro_per, fecha_pago, cantidad, comprobante_pago)
        VALUES (?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [id_usuario_seguro_per, fecha_pago, precio, precio], // comprobante_pago se guarda igual que cantidad
        (errInsert) => {
          if (errInsert) {
            console.error("Error al insertar pago:", errInsert);
            return res.status(500).json({ error: "Error al registrar el pago" });
          }

          res.status(200).json({ mensaje: "Pago registrado correctamente" });
        }
      );
    });
  } catch (error) {
    console.error("Error general:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
