const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUsers,
  getUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/", protect, getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);

module.exports = router;
