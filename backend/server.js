const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");

const destinationRoutes = require('./routes/destinationRoute');

const app = express();
//environmental variables
const url=process.env.MONGO_URI
const PORT = process.env.PORT || 5000;

app.use(cors());
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/destinations', destinationRoutes);

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
