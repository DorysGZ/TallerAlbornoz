const mongoose = require('../conexion');
const schemaData = mongoose.Schema({
    fecha_pago:Date,
    monto:Number,
    descripcion:String,
    idservicio:{ type: mongoose.Schema.Types.ObjectId, ref: 'servicio' },  
});

const userModel = mongoose.model("pago", schemaData, "pago");
module.exports = userModel;