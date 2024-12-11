const express = require("express");
const { getAllUsers, addUser, getUserById } = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);

module.exports = router;
