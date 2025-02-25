const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the name"],
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "tourGuide", "user", "hotelManager"],
      default: "user",
    },
    email: {
      type: String,
      required: [true, "please add the email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "please enter the password"],
      minLength: [6, "please add at least 6 characters!"],
      // maxLength:[23, "password is not more than 23 characters"],
    },
    photo: {
      type: String,
      // required: [true, "please add the photo"],
      default:
        "https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    },
    phone: {
      type: Number,
      default: +251,
    },
    hotelName: {
      unique: true,
      type: String,
      required: function () {
        return this.role === 'hotelManager';
      }
    },

    languages: {
      type: [String],
      enum: ["English", "Amharic", "French", "German", "Mandarin", "Other"],
    },
    destination: {
      type: String,
      required: function () {
        return this.role === 'tourGuide';
      }
    },
  },

  {
    timestamp: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
