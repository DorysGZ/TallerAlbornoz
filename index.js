const express = require('express');
const cors = require('cors');
const mongoose = require('./conexion');
const clienteRutas = require('./ruta/clienteRuta');
const vehiculoRutas = require('./ruta/vehiculoRuta');
const personalRutas = require('./ruta/personalRuta');
const servicioRutas = require('./ruta/servicioRuta');
const pagoRutas = require('./ruta/pagoRuta');
const usuarioRutas = require('./ruta/usuariologinRuta');
const usuariocrudRutas = require('./ruta/usuarioRuta');

const app = express();
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Servidor en ejecucion en el puerto", PORT);
});

app.use('/cliente', clienteRutas);
app.use('/vehiculo', vehiculoRutas);
app.use('/personal', personalRutas);
app.use('/servicio', servicioRutas);
app.use('/pago', pagoRutas);
app.use('/usuario', usuarioRutas);
app.use('/usuarioc', usuariocrudRutas);