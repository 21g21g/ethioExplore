const errorHandler = require("../utils/errorHandler/errorHandler");
const Hotel = require("../models/hotel/hotelModel");
const Room = require("../models/hotel/roomModel");

const createHotel = async (req, res, next) => {
  try {
    //const photos = req.file; if we want to use upload single file
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

    if (req.query.min) {
      query.cheapestPrice = { $gt: req.query.min };
    }

    if (req.query.max) {
      query.cheapestPrice = {
        ...query.cheapestPrice,
        $lt: req.query.max,
      };
    }

    if (req.query.city) {
      query.city = req.query.city;
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
const countBycity = async (req, res, next) => {
  const cities = req.query.cities;
  try {
    const cityData = [];
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      const hotelCount = await Hotel.find({ city: city });

      cityData.push(hotelCount);
    }
    res.json(cityData);
    console.log(cityData);
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
