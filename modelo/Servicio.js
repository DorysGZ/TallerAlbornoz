const mongoose = require('../conexion');
const schemaData = mongoose.Schema({
    fecha_ingreso:Date,
    tipo_servicio:String,
    detalles:String,
    foto_ingreso:String,
    costo: Number,
    estado_servicio:String,
    foto_salida:String,
    fecha_salida:Date,
    idpersonal:{ type: mongoose.Schema.Types.ObjectId, ref: 'personal' },
    idvehiculo: { type: mongoose.Schema.Types.ObjectId, ref: 'vehiculo' }
    
});

const userModel = mongoose.model("servicio", schemaData, "servicio");
module.exports = userModel;