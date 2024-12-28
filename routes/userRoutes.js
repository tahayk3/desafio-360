const express = require("express");
const { getAllUsers, getUserById, addUser, deleteUser, updateUser  } = require("../controllers/userController");

const { login } = require("../controllers/authController");

const { verifyToken } = require("../middlewares/authMiddleware");


const router = express.Router();

//CRUD
router.post("/", verifyToken, addUser); // Solo administradores
router.patch("/:id", verifyToken, updateUser); // Administradores o el mismo usuario
router.delete("/:id", verifyToken, deleteUser); // Solo administradores
router.get("/", verifyToken, getAllUsers); // Solo administradores
router.get("/:id", verifyToken, getUserById); // Administradores o el mismo usuario


//LOGIN
router.post("/login", login);

module.exports = router;









