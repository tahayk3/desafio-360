const express = require("express");
const { getAllUsers, getUserById, addUser, deleteUser, updateUser  } = require("../controllers/userController");

const router = express.Router();

router.post("/", addUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;
