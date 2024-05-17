const mongoose = require('../conexion');

const schemaData = mongoose.Schema({
  
nombre_usuario:String,
password:String,
fecha_creacion:Date,
estado_usuario:String,
tipo_usuario:String,
foto_usuario:String,
    idpersonal: { type: mongoose.Schema.Types.ObjectId, ref: 'personal' }
});

const userModel = mongoose.model("usuario", schemaData, "usuario");
module.exports = userModel;