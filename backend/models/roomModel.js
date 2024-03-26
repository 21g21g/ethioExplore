// models/room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['single', 'double', 'suite'], 
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  capacity: {
    type: Number,
    required: true
  },

});
const Room = mongoose.model("Room", roomSchema);
module.exports = Room;
