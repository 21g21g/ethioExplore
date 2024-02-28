const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const cors = require('cors');
const app = express();
//environmental variables
const url=process.env.MONGO_URI
const PORT = process.env.PORT || 5000;
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//route middleware
app.use("/api/users", userRoute);

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
