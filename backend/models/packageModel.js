const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    guides: [
     String
    ],

    price: {
      type: Number,
      required: [true, "please enter the price"],
    },
    duration: {
      type: Number,
    },
    createdBy: {
      type:String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    category: {
      type:String,
      required: true,
    },

    ratingsAverage: {
      type: Number,
      default:0,
      min: [0, "Rating must be above 0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    images: {
      type: Object,
      default: {},
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price should be below regular price",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
