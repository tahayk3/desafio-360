const express = require("express");
const { addEstado, updateEstado, deleteEstado, getEstadoById, getAllEstados  } = require("../controllers/estadoController");

const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', verifyToken, addEstado);
router.patch('/:id', verifyToken, updateEstado);
router.delete('/:id', verifyToken, deleteEstado);
router.get('/:id', verifyToken, getEstadoById);
router.get('/', verifyToken, getAllEstados);

module.exports = router;


