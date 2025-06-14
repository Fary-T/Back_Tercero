const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3030;


const usuarioRutas = require('./routes/usuario/usuario.rutas');
const loginRutas = require('./routes/login/login.rutas');
const seguroRutas = require('./routes/seguro/seguro.rutas');
const usuario_seguroRutas = require('./routes/usuario_seguro/usuario_seguro.rutas');
const documentosRutas = require('./routes/documentos/documentos.rutas');

const morgan = require('morgan');
const helmet = require('helmet');

app.use(morgan('dev')); // -> permite visualizar las peticiones y los estados de cada una
app.use(helmet());      // -> brinda seguridad en los headers y metadata

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));

app.use(express.json());


//http://localhost:3030/
app.use('/usuario', usuarioRutas); //http://localhost:3030/usuario ->raiz
app.use('/home', loginRutas); //http://localhost:3030/home ->raiz
app.use('/seguro', seguroRutas); //http://localhost:3030/seguro ->raiz
app.use('/usuario_seguro',usuario_seguroRutas ); //http://localhost:3030/seguro ->raiz
app.use('/documentos',documentosRutas ); //http://localhost:3030/documentos ->raiz
//app.use('/bodega', bodegaRutas); //http://localhost:3030/seguro ->raiz


//http://localhost:3030/
app.get("/", (req, res) => {
    res.send("probando la api desde la web")
});

app.listen(PORT, () => {
    console.log(`Aplicacion de express esta corriendo en el puerto http://localhost:${PORT}`);
});

