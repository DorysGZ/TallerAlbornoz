const express = require('express');
const userModel = require('../modelo/Cliente');
const router = express.Router();

// Listar
router.get("/", async (req, res) => {
    const data = await userModel.find({});
    res.json({ success: true, data: data });
    console.log(data);
});

// Crear
router.post("/create", async (req, res) => {
    console.log(req.body);
 req.body.nombre = req.body.nombre.toUpperCase();
 req.body.ap_paterno = req.body.ap_paterno.toUpperCase();
 req.body.ap_materno = req.body.ap_materno.toUpperCase();
    const data = new userModel(req.body);
    await data.save();
    res.send({ success: true, message: "dato registrado" });
});

// Actualizar
router.put("/update", async (req, res) => {   
    console.log(req.body);
    req.body.nombre = req.body.nombre.toUpperCase();
    req.body.ap_paterno = req.body.ap_paterno.toUpperCase();
    req.body.ap_materno = req.body.ap_materno.toUpperCase();
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
