const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
//http://localhost:3030/usuario_revision/
router.get("/", (req, res) => {
  try {
    //Datos tabla usuario y usuario_seguro
    const sql = `
            SELECT 
                u.id_usuario,
                u.nombre,
                u.apellido,
                u.correo,
                u.cedula,
                u.rol,
                us.id_usuario_seguro,
                us.estado
            FROM usuario u
            INNER JOIN usuario_seguro us ON u.id_usuario = us.id_usuario_per
            WHERE u.rol = 'cliente'
        `;
    db.query(sql, (err, results) => {
      if (err) {
        console.log("Error al consultar cliente: ", err);
        return res
          .status(500)
          .json({ error: "No se pudo conectar al servidor" });
      }
      if (!results || results.length === 0) {
        return res
          .status(404)
          .json({ message: "No existen clientes registrados" });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error en la consulta de clientes: ", error);
    res.status(500).json({ error: "No se pudo consultar en la base de datos" });
  }
});
module.exports = router;
