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
 
    location: {
      type: {
        region:{
        type: String,
        required: true,
        enum: ["Afar","Amhara", "Benshangul-Gumz", "Gambela", "Harar", "Oromia", "SNNPR", "Somalia", "Tigray",],
        },
        address:String,
      },
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      main: {
        type: String,
        required: [true, 'Main image is required.'],
      },
      gallery: {
        
          type: [String],
          default: [],
         },
        },
   
     ratings: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    }
        
  
  },
  {
    timestamps: true,
  }
);

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
