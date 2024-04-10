const express = require('express');
const { addHotelManager, getAllHotelManagers, getHotelManagerById, deleteHotelManager, updateHotelManager, addUser } = require('../controllers/admincontrollers/HotelManagerController');

const {protect, admin}=require("../middlewares/authMiddleware")
const router = express.Router();

router.post("/", addUser);
router.get("/", protect,admin, getAllHotelManagers);
router.get("/:id", getHotelManagerById);
router.delete("/:id", deleteHotelManager);
router.put("/:id", updateHotelManager);

module.exports = router;