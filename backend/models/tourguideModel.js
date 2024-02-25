const mongoose = require("mongoose");

const tourGuideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    languages: {
      type: [String],
      required: true,
      enum: ["English", "Amharic", "French", "German", "Mandarin", "Other"],
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    tours: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 4.0,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    availability: {
      weekdays: {
        type: Boolean,
        default: false,
      },
      weekends: {
        type: Boolean,
        default: true,
      },
    },
    profilePicture: {
      type: Object,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const TourGuide = mongoose.model("TourGuide", tourGuideSchema);
module.exports = TourGuide;
