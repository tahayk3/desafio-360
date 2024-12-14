const express = require("express");
const { addEstado,updateEstado  } = require("../controllers/estadoController")

const router = express.Router();

router.post('/', addEstado);
router.patch('/:id', updateEstado);

module.exports = router;


