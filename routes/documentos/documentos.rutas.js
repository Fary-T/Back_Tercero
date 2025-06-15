const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
//s3
const multer = require("multer");
const subirArchivo = require("../../s3/subirArchivos");
const fs = require("fs");
const path = require("path");
const upload = multer({ dest: "uploads/" });

//s3 listar
//const listarArchivos = require('../../s3/listarArchivos');
//s3 descarga
//const obtenerUrlArchivo = require('../../s3/obtenerUrl');
//s3 eliminar
//const eliminarArchivo = require('../../s3/eliminarArchivo');

// http://localhost:3030/documentos/
router.post("/", upload.single("archivo"), async (req, res) => {
  const file = req.file; //s3
  const { id, cedula, nombre_documento, id_requisito_per, id_seguro_per } = req.body;

  try {
    console.log("Archivo recibido:", file);
    const key =
      id + "/" + cedula + "/" + nombre_documento + "/" + file.originalname;
    

    const queryConsulta = `SELECT id_usuario_seguro FROM usuario_seguro WHERE id_usuario_per = ? AND id_seguro_per = ?`;
    db.query(queryConsulta, [id, id_seguro_per], (err, result) => {
      if (err) {
        console.log("Ocurrio un error en la consulta: ", err);
        return res.status(500).json({ err: "Error al consultar id_usuario_seguro" })
      }
      const resultado = result[0].id_usuario_seguro;
      console.log("id_usuario_seguro: ",resultado);

      const query = `INSERT INTO requisito_seguro (id_usuario_seguro_per, id_requisito_per, informacio, validado) VALUES (?, ?, ?, 0)`;
      db.query(query, [resultado, id_requisito_per, key], (err) => {
        if (err) {
          console.error("Error al guardar en BD:", err);
          return res.status(500).json({ error: "Error guardando metadatos" });
        }
      });
    })
    console.log("Antes de subir archivo a aws");
    //await subirArchivo(file.path, key);
    res.status(200).json({estado: "OK"});

  } catch (err) {
    console.error("Error detallado al subir archivo:", err);
    res
      .status(500)
      .json({ error: "Error al subir el archivo", detalle: err.message });
  }
});

// http://localhost:3030/documentos/formulario
router.post("/formulario", upload.single("archivo"), async (req, res) => {
  const file = req.file; //s3
  const { id_usuario_per, cedula, nombre_documento, id_seguro_per } = req.body;

  try {
    console.log("Archivo recibido:", file);
    const key =
      id_usuario_per + "/" + cedula + "/" + nombre_documento + "/" + file.originalname;
    
      const query = `INSERT INTO usuario_seguro (id_usuario_per, id_seguro_per , fecha_contrato, estado, estado_pago, formulario) VALUES (?, ?, CURRENT_DATE, 0, 0, ?)`;
      db.query(query, [id_usuario_per, id_seguro_per, key], (err) => {
        if (err) {
          console.error("Error al guardar en BD:", err);
          return res.status(500).json({ error: "Error guardando metadatos" });
        }
      });

    console.log("Antes de subir archivo a aws");
    await subirArchivo(file.path, key);
    res.status(200).json({estado: "OK"});

  } catch (err) {
    console.error("Error detallado al subir archivo:", err);
    res
      .status(500)
      .json({ error: "Error al subir el archivo", detalle: err.message });
  }
});

// http://localhost:3030/documentos/lista
router.get("/lista", async (req, res) => {
  try {
    const archivos = await listarArchivos();

    const archivosConKey = archivos.map((archivo) => ({
      ...archivo,
      key: archivo.Key, // clave de S3 como en el primer ejemplo ->supongo que aqui estas buscando llamar al archivo.nombre
    }));

    res.json(archivosConKey);
  } catch (error) {
    console.error("Error al listar archivos:", error);
    res.status(500).json({ error: "No se pudieron listar los archivos" });
  }
});

// http://localhost:3030/documentos/descargar
router.get("/descargar", async (req, res) => {
  const { key } = req.query;

  if (!key) {
    return res
      .status(400)
      .json({ error: 'Falta el parámetro "key" en la consulta' });
  }

  try {
    const archivoStream = await obtenerArchivoDesdeS3(key); // función que devuelve un stream desde S3

    const nombreArchivo = key.split("/").pop();
    res.attachment(nombreArchivo);

    // Enviar el archivo al cliente
    archivoStream.pipe(res);
  } catch (error) {
    console.error("Error al descargar archivo:", error);
    res.status(500).json({
      error: "No se pudo descargar el archivo",
      detalle: error.message,
    });
  }
});

// http://localhost:3030/documentos/eliminar
router.delete("/eliminar", async (req, res) => {
  const { key } = req.body;

  if (!key) {
    return res
      .status(400)
      .json({ error: 'Falta el parámetro "key" en el cuerpo de la solicitud' });
  }

  try {
    await eliminarArchivoDesdeS3(key);
    res.json({ mensaje: `Archivo eliminado correctamente: ${key}` });
  } catch (error) {
    console.error("Error al eliminar archivo:", error);
    res.status(500).json({
      error: "No se pudo eliminar el archivo",
      detalle: error.message,
    });
  }
});


module.exports = router;
