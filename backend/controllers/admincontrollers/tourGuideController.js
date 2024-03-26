// backend/controllers/tourGuideController.js
const User = require('../../models/userModel');

// Add Tour Guide
exports.addTourGuide = async (req, res) => {
  try {
    const { name, email, password, photo, phone, destination } = req.body;
    const tourGuide = new User({ name, email, password, photo, phone, role: 'tourGuide', destination });
    await tourGuide.save();
    res.status(201).json({tourGuide});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Tour Guides
exports.getAllTourGuides = async (req, res) => {
  try {
    const tourGuides = await User.find({ role: 'tourGuide' });
    res.status(200).json(tourGuides);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Tour Guide by ID
exports.getTourGuideById = async (req, res) => {
  try {
    const { id } = req.params;
    const tourGuide = await User.findById(id);
    if (!tourGuide || tourGuide.role !== 'tourGuide') {
      return res.status(404).json({ message: 'Tour guide not found' });
    }
    res.status(200).json(tourGuide);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Tour Guide
exports.updateTourGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, photo, phone, destination } = req.body;

    const tourGuide = await User.findById(id);
    if (!tourGuide || tourGuide.role !== 'tourGuide') {
      return res.status(404).json({ message: 'Tour guide not found' });
    }

    tourGuide.name = name || tourGuide.name;
    tourGuide.email = email || tourGuide.email;
    tourGuide.photo = photo || tourGuide.photo;
    tourGuide.phone = phone || tourGuide.phone;
    tourGuide.destination = destination || tourGuide.destination;

    await tourGuide.save();
    res.status(200).json(tourGuide);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Tour Guide
exports.deleteTourGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const tourGuide = await User.findById(id);
    if (!tourGuide || tourGuide.role !== 'tourGuide') {
      return res.status(404).json({ message: 'Tour guide not found' });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Tour guide deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
