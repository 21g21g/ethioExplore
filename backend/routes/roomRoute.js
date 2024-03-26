const express = require("express");
const {
  createRoom,

  getRoom,
  deleteRoom,
  updateRoom,
  getRooms,
  updateAvailability,
} = require("../controllers/roomController");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "photoroom/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + " " + file.originalname);
  },
});
const photoroom = multer({ storage: storage });
router.post("/:id/createroom", photoroom.array("photos"), createRoom);
router.get("/getroom/:id", getRoom);
router.get("/getrooms", getRooms);
router.put("/updateroom/:id/:hotelId", updateRoom);
router.put("/availability/:id/", updateAvailability);

router.delete("/deleteroom/:id/:hotelId", deleteRoom);

module.exports = router;
