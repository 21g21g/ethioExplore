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

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + " " + file.originalname);
//   },
// });
// const uploads = multer({ storage: storage });
// //we can use uploads.single if we can set only a single file
// // routes/hotelRoutes.js

// const express = require('express');
// const router = express.Router();
// const {
//   createHotel,
//   updateHotel,
//   deleteHotel,
//   getHotel,
//   getHotels,
//   countBycity,
//   countBytype,
//   getHotelroom,
// } = require('../controllers/hotelController');
// const { protect, admin, tourGuide, user, hotelManager } = require('../middleware/authMiddleware');
// const multer = require('multer');
// const path = require('path');
const {protect,admin,tourGuide,user,hotelManager}=require("../middlewares/authMiddleware")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ' ' + file.originalname);
  },
});
const uploads = multer({ storage: storage });

// router.post('/createhotel', protect, hotelManager, uploads.array('photos'), createHotel);
// router.get('/gethotel/:id', protect, getHotel);
// router.get('/gethotels', protect, getHotels);
// router.put('/updatehotel/:id', protect, hotelManager, updateHotel);
// router.delete('/deletehotel/:id', protect, hotelManager, deleteHotel);
// router.get('/countbycity', protect, admin, countBycity);
// router.get('/countbytype', protect, admin, countBytype);
// router.get('/room/:id', protect, getHotelroom);

// module.exports = router;

router.post("/createhotel",protect,hotelManager, uploads.array("photos"), createHotel);
router.get("/gethotel/:id", protect,hotelManager, getHotel);
router.get("/gethotels", getHotels);
router.put("/updatehotel/:id", updateHotel);
router.delete("/deletehotel/:id", deleteHotel);
router.get("/countbycity", countBycity);
router.get("/countbytype", countBytype);
router.get("/room/:id", getHotelroom);

module.exports = router;
