const mongoose = require('mongoose');

//mongoose.connect("mongodb://127.0.0.1:27017/taller_albornoz").then(() => {

mongoose.connect("mongodb+srv://taller:taller12345@cluster0.sepwrlu.mongodb.net/taller_albornoz").then(() => {
    
    console.log("Conectado a la base de datos");
}).catch((error) => {
    console.error("Error de conexion a la base de datos:", error);
});

module.exports = mongoose;
