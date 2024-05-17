const express = require('express');
const userModel = require('../modelo/Servicio');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/pendiente'); 
    },
    filename: (req, file, cb) => {
      const fileName = `${file.originalname}`;
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage });

  router.use('/verfoto', express.static(path.join(__dirname, '../uploads/pendiente')));

router.post("/create",upload.single('file'), async (req, res) => {
    console.log(req.body);
    req.body.detalles = req.body.detalles.toUpperCase();
    const data = new userModel(req.body);
    await data.save();
    res.send({ success: true, message: "dato registrado" });

});


// Listar
router.get("/pendientes", async (req, res) => {

    try {
        const data = await userModel.find({ estado_servicio: { $eq: "PENDIENTE" } }).populate({
            
            path: 'idpersonal',
            select: 'ci_per nombre_per paterno_per materno_per',
            }).populate({
                path: 'idvehiculo',
                select: 'placa modelo marca color observaciones',
                populate: [
                    {path: 'idcliente',select: 'nombre ap_paterno'},
                ]
                });
        res.json({ success: true, data: data });
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const data = await userModel.find({}).populate({
            path: 'idpersonal',
            select: 'ci_per nombre_per paterno_per materno_per',
            }).populate({
                path: 'idvehiculo',
                select: 'placa modelo marca color observaciones',
                populate: [
                    {path: 'idcliente',select: 'nombre ap_paterno'},
                ]
                });
        res.json({ success: true, data: data });
        console.log(data);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});





// Actualizar
router.put("/update",upload.single('file'),async (req, res) => {   
    console.log(req.body);

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
