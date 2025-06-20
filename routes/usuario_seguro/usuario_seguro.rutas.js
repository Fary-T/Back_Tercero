const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const nodemailer = require("nodemailer");

//http://localhost:3030/usuario_seguro/
router.post("/", (req, res) => {
  //debe ser por metodo get
  db.query("SELECT * FROM usuario_seguro", (err, resultado) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al consultar los usuarios" });
    } else {
      res.json(resultado);
    }
  });
});
//http://localhost:3030/usuario_seguro/agregar
router.post("/agregar", (req, res) => {
  const {
    id_usuario_per,
    id_seguro_per,
    fecha_contrato,
    fecha_fin,
    estado,
    estado_pago,
  } = req.body;

  const query = `
        INSERT INTO usuario_seguro 
        (id_usuario_per, id_seguro_per, fecha_contrato, fecha_fin, estado, estado_pago)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  const valores = [
    id_usuario_per,
    id_seguro_per,
    fecha_contrato,
    fecha_fin,
    estado,
    estado_pago,
  ];
  console.log(valores);
  db.query(query, valores, (err, resultado) => {
    if (err) {
      console.error("Error al insertar usuario_seguro:", err);
      res.status(500).json({ error: "Error al agregar el registro" });
    } else {
      res
        .status(201)
        .json({
          mensaje: "Registro agregado correctamente",
          id_insertado: resultado.insertId,
        });
    }
  });
});

// http://localhost:3030/usuario_seguro/editar/:id
router.put("/editar/:id", (req, res) => {
  const id = req.params.id;

  const {
    id_usuario_per,
    id_seguro_per,
    fecha_contrato,
    fecha_fin,
    estado,
    estado_pago,
  } = req.body;

  if (
    id_usuario_per === undefined ||
    id_seguro_per === undefined ||
    !fecha_contrato ||
    !fecha_fin ||
    estado === undefined ||
    estado_pago === undefined
  ) {
    return res.status(400).json({
      error: "Faltan datos requeridos para la edición",
      received: {
        id_usuario_per,
        id_seguro_per,
        fecha_contrato,
        fecha_fin,
        estado,
        estado_pago,
      },
    });
  }

  const sql = `
        UPDATE usuario_seguro 
        SET id_usuario_per = ?, id_seguro_per = ?, fecha_contrato = ?, fecha_fin = ?, estado = ?, estado_pago = ?
        WHERE id_usuario_seguro = ?
    `;

  const valores = [
    id_usuario_per,
    id_seguro_per,
    fecha_contrato,
    fecha_fin,
    estado,
    estado_pago,
    id,
  ];

  db.query(sql, valores, (err, resultado) => {
    if (err) {
      console.error("Error al editar usuario_seguro:", err);
      res.status(500).json({ error: "Error al editar el registro" });
    } else {
      res.status(200).json({ mensaje: "Registro actualizado correctamente" });
    }
  });
});

router.delete("/eliminar/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM usuario_seguro WHERE id_usuario_seguro = ?";

  db.query(sql, [id], (err, resultado) => {
    if (err) {
      console.error("Error al eliminar usuario_seguro:", err);
      res.status(500).json({ error: "Error al eliminar el registro" });
    } else if (resultado.affectedRows === 0) {
      res
        .status(404)
        .json({ mensaje: "No se encontró el registro con ese ID" });
    } else {
      res.status(200).json({ mensaje: "Registro eliminado correctamente" });
    }
  });
});

// http://localhost:3030/usuario_seguro/mensaje/:correo
router.post("/mensaje/:correo", async (req, res) => {
  const correo = req.params.correo;
  const password = req.body.password;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ed6147266@gmail.com",
      pass: "mvwj rmfm clvn aekn",
    },
  });

  async function main() {
    const mensaje = {
      from: "ed6147266@gmail.com",
      to: correo,
      subject: "Contraseña Temporal",
      text: `Tu contraseña es: ${password}`,
    };

    const info = await transporter.sendMail(mensaje);
    console.log("Correo enviado:", info.response);
  }

  main().catch(console.error);
});

// Ruta: PUT http://localhost:3030/usuario_seguro/modificar/id
router.put("/modificar/:id", (req, res) => {
  const id = req.params.id;
  const { estado } = req.body;

  // Validación de entrada
  if (!id || estado === undefined) {
    return res.status(400).json({
      error: "Faltan datos requeridos",
      camposNecesarios: ["id", "estado"],
    });
  }

  // Consulta SQL para actualizar el estado
  const sql =
    "UPDATE usuario_seguro SET estado = ? WHERE id_usuario_seguro = ?";
  const values = [estado, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error al editar usuario_seguro:", err);
      return res
        .status(500)
        .json({ error: "No se pudo actualizar el registro" });
    }

    res.status(200).json({ mensaje: "Estado actualizado correctamente" });
  });
});

module.exports = router;
