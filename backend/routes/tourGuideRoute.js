const express = require('express');

const { addTourGuide, getAllTourGuides, getTourGuideById, updateTourGuide, deleteTourGuide } = require('../controllers/admincontrollers/TourGuideController');
const router = express.Router();

router.post("/", addTourGuide);
router.get("/", getAllTourGuides);
router.get("/:id", getTourGuideById);
router.delete("/:id", deleteTourGuide);
router.put("/:id", updateTourGuide);

module.exports = router;