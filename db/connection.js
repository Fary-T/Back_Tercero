const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'superadministrador',
    database: 'seguros'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = db;
