const express = require("express");
const router = express.Router();
const db = require("../../db/connection");



//http://localhost:3030/login/  ->internamente mandare un correo y una contraseña
router.post("/", (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    return res
      .status(400)
      .json({ mensaje: "Correo y contraseña son obligatorios" });
  }
  const query = "select * from usuario where correo = ? AND password=?";

  db.query(query, [correo, contrasenia], (err, results) => {
    if (err) {
      console.error("Error al ejecutar el procedimiento:", err);
      return res
        .status(500)
        .json({ mensaje: "Error en el servidor al logearse" });
    }

    const usuario = results[0]; // Los procedimientos almacenados retornan un array de arrays

    if (!usuario) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
    
    // Login exitoso
    return res.status(200).json({
      mensaje: "Login exitoso",
      usuario,
    });
  });
});

module.exports = router;
