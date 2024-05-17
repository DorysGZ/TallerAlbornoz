const mongoose = require('../conexion');

const schemaData = mongoose.Schema({
    ci_per:Number,
    nombre_per: String,
    paterno_per: String,
    materno_per: String,
    direccion_per: String,
    celular_per: Number,
    celular_referencia: Number,
    cargo: String,
    
});

const userModel = mongoose.model("personal", schemaData, "personal");
module.exports = userModel;