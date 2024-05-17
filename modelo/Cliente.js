const mongoose = require('../conexion');

const schemaData = mongoose.Schema({
    ci:Number,
    nombre: String,
    ap_paterno: String,
    ap_materno: String,
    direccion: String,
    celular: Number,
    
});

const userModel = mongoose.model("cliente", schemaData, "cliente");
module.exports = userModel;