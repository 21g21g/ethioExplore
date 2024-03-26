const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const hotelRoute = require("./routes/hotelRoute");
const roomRoute = require("./routes/roomRoute");
const cors = require("cors");
const app = express();
//environmental variables
const url = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/photoroom", express.static("photoroom"));

//route middleware
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "internal server error";

  res.status(status).json({
    success: false,
    status,
    message,
  });
});

//connect mongodb and listen to server
mongoose
  .connect(url)
  .then(() => {
    console.log("mongodb connected");
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
