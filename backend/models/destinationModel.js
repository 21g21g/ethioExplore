const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["International", "National", "Religious", "Cultural"],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    features: [{
      type: String,
      required: true,
    }],

    location: {
      type: String,
      required: true,
    },

    images: {
      type: Object,
      required: true,
      default: {},
    },

    ratings: {
      type: Number,
      default: 0,
    },

    reviews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: String,
      rating: Number,
    }],

    priceRange: {
      type: String,
      enum: ["Budget", "Mid-range", "Luxury"],
    },
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
