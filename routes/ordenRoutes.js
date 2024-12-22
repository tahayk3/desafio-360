const express = require("express");

const { addOrden, updateOrden, getOrdenById, getAllOrdenes, updateOrdenEncabezado } = require("../controllers/ordenController");

const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', verifyToken, addOrden);
router.patch('/:id', verifyToken, updateOrden);
router.patch('/encabezado/:id', verifyToken, updateOrdenEncabezado);
router.get("/:id", verifyToken, getOrdenById);
router.get("/", verifyToken, getAllOrdenes);


module.exports = router;


