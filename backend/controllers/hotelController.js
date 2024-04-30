const errorHandler = require("../utils/errorHandler/errorHandler");
const Hotel = require("../models/hotel/hotelModel");
const Room = require("../models/hotel/roomModel");

const createHotel = async (req, res, next) => {
  try {
    const photos = req.files;

    const newHotel = await Hotel.create({
      ...req.body,
      photos: photos.map((file) => "uploads/" + file.filename),
    });

    res.status(200).json({
      message: "Hotel created successfully",
      newHotel,
    });
  } catch (error) {
    return next(errorHandler(400, "The hotel is not created"));
  }
};
const getHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const gethotel = await Hotel.findById(id);
    if (!gethotel) {
      return next(errorHandler(400, "the hotel in this id is not found"));
    }
    res.status(200).json(gethotel);
  } catch (error) {
    return next(errorHandler(400, "the hotel is not occured"));
  }
};
const getHotels = async (req, res, next) => {
  try {
    let query = {};

    
      if (req.query.min && req.query.max) {
        // Filter hotels within the price range
        query.cheapestPrice = {
          $gte: parseInt(req.query.min), // Greater than or equal to min price
          $lte: parseInt(req.query.max), // Less than or equal to max price
        };
      } else if (req.query.min) {
        // Filter hotels with minimum price greater than or equal to min
        query.cheapestPrice = { $gte: parseInt(req.query.min) };
      } else if (req.query.max) {
        // Filter hotels with maximum price less than or equal to max
        query.cheapestPrice = { $lte: parseInt(req.query.max) };
      }

    if (req.query.city) {
      query.city = req.query.city.toLowerCase();
    }

    if (req.query.featured) {
      query.featured = req.query.featured;
    }

    const gethotels = await Hotel.find(query).limit(req.query.limit);
    res.status(200).json(gethotels);
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ); //new:true is used to return the updated document but if we cannot use new:true it returns the previous value.

    ////// tommorow carousol,redux,
    if (!updateHotel) {
      return next(errorHandler(400, "the hotel is not found"));
    }
    res.status(200).json({ message: "you update successfully", updateHotel });
  } catch (error) {
    return next(errorHandler(400, error.message));
  }
};
const getHotelroom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    // console.log(hotel.rooms);
    const rooms = [];
    for (const room of hotel.rooms) {
      const roomDocument = await Room.findById(room);
      rooms.push(roomDocument);
    }

    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
const deleteHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteHotel = await Hotel.findByIdAndDelete(id);
    if (!deleteHotel) {
      return next(errorHandler(400, "the hotel in this id is not found"));
    }
    res
      .status(200)
      .json({ message: "you succesfully delete the hotel in this id" });
  } catch (error) {
    return next(errorHandler(400, error.message));
  }
};
//group hotels by city then count and finall push all documents on that group.
const countBycity = async (req, res, next) => {
  try {
    const cityCounts = await Hotel.aggregate([
      {
        $group: {
          _id: { $toLower: "$city" },
          count: { $sum: 1 },
          hotels: { $push: "$$ROOT" },
        },
      },
    ]);
    res.json(cityCounts);
  } catch (error) {
    next(error);
  }
};
const countBytype = async (req, res, ext) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartamaCount = await Hotel.countDocuments({ type: "apartama" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartama", count: apartamaCount },
      { type: "resort", count: resortCount },
    ]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countBycity,
  countBytype,
  getHotelroom,
};
