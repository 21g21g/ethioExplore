const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const hotelManagerRoute = require("./routes/hotelManagerRoute");
const tourGuideRoute = require("./routes/tourGuideRoute");
const hotelRoute = require("./routes/hotelRoute");
const roomRoute = require("./routes/roomRoute");

const cors = require("cors");
const destinationRoutes = require("./routes/destinationRoute");

const app = express();
//environmental variables
const url = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
//avoid conflic for the back and frontend
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/photoroom", express.static("photoroom"));
//route middleware
app.use("/api/users", userRoute);
app.use("/api/managers", hotelManagerRoute);
app.use("/api/tourguides", tourGuideRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/destinations", destinationRoutes);
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
