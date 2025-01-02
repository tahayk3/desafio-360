const express = require("express");

const { addProducto, updateProducto, deleteProducto, getProductoById, getAllProductos } = require("../controllers/productoController");
const router = express.Router();

const { verifyToken } = require("../middlewares/authMiddleware");

router.post('/', verifyToken, addProducto);
router.patch('/', verifyToken, updateProducto);
router.delete('/:id', verifyToken, deleteProducto);
router.get('/:id', verifyToken, getProductoById);
router.get('/', verifyToken, getAllProductos)

module.exports = router;








