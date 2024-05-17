const mongoose = require('../conexion');

const schemaData = mongoose.Schema({

    placa:String,
    modelo: Number,
    marca: String,
    color: String,
    observaciones: String,
   
    idcliente: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente' }
});

const userModel = mongoose.model("vehiculo", schemaData, "vehiculo");
module.exports = userModel;