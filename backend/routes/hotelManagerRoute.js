const express = require('express');

const {
    addHotelManager,
    getAllHotelManagers,
    getHotelManagerById,
    updateHotelManager,
    deleteHotelManager } = require('../controllers/admincontrollers/hotelManagerController');
const router = express.Router();

router.post("/", addHotelManager);
router.get("/", getAllHotelManagers);
router.get("/:id", getHotelManagerById);
router.delete("/:id", deleteHotelManager);
router.put("/:id", updateHotelManager);

module.exports = router;