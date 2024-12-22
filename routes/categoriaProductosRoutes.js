const express = require("express");
const { 
    addCategoriaProducto, 
    updateCategoriaProducto, 
    deleteCategoriaProducto,
     getCategoriaProductoById, 
     getAllCategoriaProducto  } = require("../controllers/categoriaProductosController");

const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', verifyToken, addCategoriaProducto);
router.patch('/:id', verifyToken, updateCategoriaProducto);
router.delete('/:id', verifyToken, deleteCategoriaProducto);
router.get('/:id', verifyToken, getCategoriaProductoById);
router.get('/', verifyToken, getAllCategoriaProducto);




module.exports = router;


