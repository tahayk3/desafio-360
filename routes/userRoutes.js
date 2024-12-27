const express = require("express");
const { getAllUsers, getUserById, addUser, deleteUser, updateUser  } = require("../controllers/userController");

const { login } = require("../controllers/authController");

const { verifyToken } = require("../middlewares/authMiddleware");
const { checkUserRole } = require("../middlewares/checkUserRole");

const router = express.Router();

//CRUD
router.post("/", verifyToken, addUser); // Solo administradores
router.patch("/:id", verifyToken, checkUserRole([1, 2]), updateUser); // Administradores o el mismo usuario
router.delete("/:id", verifyToken, checkUserRole([1]), deleteUser); // Solo administradores
router.get("/", verifyToken, checkUserRole([1]), getAllUsers); // Solo administradores
router.get("/:id", verifyToken, checkUserRole([2]), getUserById); // Administradores o el mismo usuario


//LOGIN
router.post("/login", login);

module.exports = router;









