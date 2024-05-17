const express = require('express');
const userModel = require('../modelo/Vehiculo');
const router = express.Router();

// Listar
router.get("/", async (req, res) => {
    try {
        const data = await userModel.find({}).populate('idcliente', 'ci nombre ap_paterno ap_materno');
        res.json({ success: true, data: data });
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Crear
router.post("/create", async (req, res) => {
    console.log(req.body);
 req.body.placa = req.body.placa.toUpperCase();
 req.body.color = req.body.color.toUpperCase();
 req.body.marca = req.body.marca.toUpperCase();
 req.body.observaciones = req.body.observaciones.toUpperCase();
    const data = new userModel(req.body);
    await data.save();
    res.send({ success: true, message: "dato registrado" });
});

// Actualizar
router.put("/update", async (req, res) => {   
    console.log(req.body);
    req.body.placa = req.body.placa.toUpperCase();
    req.body.color = req.body.color.toUpperCase();
    req.body.marca = req.body.marca.toUpperCase();
    req.body.observaciones = req.body.observaciones.toUpperCase();
    const { _id, ...rest } = req.body;
    console.log(rest);
    const data = await userModel.updateOne({ _id: _id }, rest);
    res.send({ success: true, message: "actualizado", data: data });
});

// Eliminar
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({ _id: id });
    res.send({ success: true, message: "eliminado", data: data });
});


module.exports = router;
