const express = require("express");


const { addRol, updateRol, deleteRol, getRolById, getAllRoles } = require("../controllers/rolController");

const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', verifyToken, addRol);
router.patch('/:id', verifyToken, updateRol);
router.delete('/:id', verifyToken, deleteRol);
router.get('/:id', verifyToken, getRolById);
router.get('/', verifyToken, getAllRoles);

module.exports = router;



