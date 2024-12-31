const express = require("express");
const { getAllUsers, getUserById, addUser, deleteUser, updateUser  } = require("../controllers/userController");

const { login } = require("../controllers/authController");

const { verifyToken } = require("../middlewares/authMiddleware");


const router = express.Router();

//CRUD
// Operadores y usuarios
router.post("/", addUser); 
// Operadores(su perfil,  activar o desactivar otros usuarios) o el usuario su mismo 
router.patch("/:id", verifyToken, updateUser);
// Solo los operadores pueden desactivar a otros usuarios u operadores 
router.delete("/:id", verifyToken, deleteUser);
//solo si eres operador puedes ver a todos los usuarios
router.get("/", verifyToken, getAllUsers);
//
router.get("/:id", verifyToken, getUserById); 


//LOGIN
router.post("/login", login);

module.exports = router;









