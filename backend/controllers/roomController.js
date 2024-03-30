const errorHandler = require("../utils/errorHandler/errorHandler");
const Room = require("../models/hotel/roomModel");
const Hotel = require("../models/hotel/hotelModel");

const createRoom = async (req, res, next) => {
  const photos = req.files;
  const { roomNumbers } = req.body;

  const hotelId = req.params;

  try {
    const parsedRoomNumbers = JSON.parse(roomNumbers);

    const newRoom = await Room.create({
      ...req.body,
      roomNumbers: parsedRoomNumbers,

      photos: photos.map((file) => "photoroom/" + file.filename),
    });
    await Hotel.findByIdAndUpdate(hotelId.id, {
      $push: { rooms: newRoom._id },
    });

    res
      .status(200)
      .json({ message: "the room is created succesfully", newRoom });
  } catch (error) {
    next(error);
  }
};
const getRoom = async (req, res, next) => {
  const id = req.params;
  console(id);

  try {
    const getroom = await Room.findById(id);
    if (!getroom) {
      return next(errorHandler(400, "the hotel in this id is not found"));
    }
    res
      .status(200)
      .json({ message: "this is the hotel in the given id", getroom });
  } catch (error) {
    next(error);
  }
};
const getRooms = async (req, res, next) => {
  try {
    const getrooms = await Room.find();
    if (!getrooms) {
      return next(errorHandler(400, "there is no hotels"));
    }
    res.status(200).json({ message: "the hotels are this", getrooms });
  } catch (error) {
    next(error);
  }
};
const updateRoom = async (req, res, next) => {
  const id = req.params;
  console.log(id);
  const hotelId = req.params;

  try {
    const updateroom = await Room.findByIdAndUpdate(
      id.id,
      { $set: req.body },
      { new: true }
    );
    await Hotel.findByIdAndUpdate(hotelId.id, {
      $push: { rooms: updateroom._id },
    });

    //new:true is used to return the updated document but if we cannot use new:true it returns the previous value.

    res.status(200).json({ message: "you update successfully", updateroom });
  } catch (error) {
    next(error);
  }
};
const updateAvailability = async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const dates = req.body.dates;
    const isoDates = dates.map((all) => new Date(all).toISOString());

    console.log(dates);
    console.log(roomId);
    // Extract dates from request body

    // Update the unavailableDates array for the specified room
    await Room.updateOne(
      { "roomNumbers._id": roomId },
      {
        $push: {
          // Push the new dates to the unavailableDates array
          "roomNumbers.$.unavailableDates": { $each: isoDates },
        },
      }
    );

    // Send a success response
    res
      .status(200)
      .json({ message: "Room availability updated successfully", ro });
  } catch (error) {
    // Forward the error to the error handling middleware
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  const id = req.params;
  console.log(id);
  const hotelId = req.params;

  try {
    const deleteroom = await Room.findByIdAndDelete(id);

    await Hotel.findByIdAndUpdate(hotelId.id, {
      $pull: { rooms: id.id },
    });
    res
      .status(200)
      .json({ message: "you succesfully delete the hotel in this id" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoom,
  getRoom,
  deleteRoom,
  updateRoom,
  getRooms,
  updateAvailability,
};
