const express = require("express");
const multer = require("multer");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countBycity,
  countBytype,
  getHotelroom,
} = require("../controllers/hotelController");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + " " + file.originalname);
  },
});
const uploads = multer({ storage: storage });
//we can use uploads.single if we can set only a single file

router.post("/createhotel", uploads.array("photos"), createHotel);
router.get("/gethotel/:id", getHotel);
router.get("/gethotels", getHotels);
router.put("/updatehotel/:id", updateHotel);
router.delete("/deletehotel/:id", deleteHotel);
router.get("/countbycity", countBycity);
router.get("/countbytype", countBytype);
router.get("/room/:id", getHotelroom);

module.exports = router;
