// backend/controllers/hotelManagerController.js
const User = require('../../models/userModel');
const asyncHandler = require("express-async-handler");

exports.addUser = async (req, res) => {
  try {
    const { name, email, password, photo, phone, role, destination, hotelName, languages, } = req.body;
    const userData = { name, email, password, photo, phone, role };

    // Include additional fields based on role
    if (role === 'hotelManager') {
      userData.hotelName = hotelName;
    } else if (role === 'tourGuide') {
      userData.destination = destination;
    }

    const user = new User(userData);
    await user.save();
    res.status(201).json({ data: { user } });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Add Hotel Manager
exports.addHotelManager = asyncHandler(async (req, res) => {
  const { name, email, password, photo, phone, hotelName } = req.body;
  const hotelManager = new User({ name, email, password, photo, phone, role: 'hotelManager', hotelName });

    // Check if user exists
    const manager = await User.findOne({ email,hotelName, role: 'hotelManager' });
    if (manager) {
      res.status(401);
      throw new Error("Manager already exists");
    }

    await hotelManager.save();
    res.status(201).json({
      data: {
        hotelManager
      }
    });
    res.status(400).json({message:error});
    
  
});


// Get all Hotel Managers
exports.getAllHotelManagers = async (req, res) => {
  try {
    const hotelManagers = await User.find({ role: 'hotelManager' });
    res.status(200).json({ data: { hotelManagers } });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get Hotel Manager by ID
exports.getHotelManagerById = async (req, res) => {
  try {
    const { id } = req.params;
    const hotelManager = await User.findById(id);
    if (!hotelManager || hotelManager.role !== 'hotelManager') {
      return res.status(404).json({ message: 'Hotel manager not found' });
    }
    res.status(200).json({ data: { hotelManager } });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Hotel Manager
exports.updateHotelManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, photo, phone, hotelName, } = req.body;

    const hotelManager = await User.findById(id);
    if (!hotelManager || hotelManager.role !== 'hotelManager') {
      return res.status(404).json({ message: 'Hotel manager not found' });
    }

    hotelManager.name = name || hotelManager.name;
    hotelManager.email = email || hotelManager.email;
    hotelManager.photo = photo || hotelManager.photo;
    hotelManager.phone = phone || hotelManager.phone;
    hotelManager.hotelName = hotelName || hotelManager.hotelName;

    await hotelManager.save();
    res.status(200).json(hotelManager);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Hotel Manager
exports.deleteHotelManager = async (req, res) => {
  try {
    const { id } = req.params;
    const hotelManager = await User.findById(id);
    if (!hotelManager || hotelManager.role !== 'hotelManager') {
      return res.status(404).json({ message: 'Hotel manager not found' });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Hotel manager deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
