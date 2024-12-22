const express = require("express");
const { getAllUsers, getUserById, addUser, deleteUser, updateUser  } = require("../controllers/userController");

const { login } = require("../controllers/authController");

const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

//CRUD
router.post("/", verifyToken,  addUser);
router.patch("/:id", verifyToken,  updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/", verifyToken, getAllUsers);
router.get("/:id", verifyToken, getUserById);

//LOGIN
router.post("/login", login);

module.exports = router;


