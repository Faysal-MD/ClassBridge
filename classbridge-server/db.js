const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
// const DB_NAME = process.env.DB_NAME

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB is Connected...");
  })
  .catch((err) => {
    console.log("MongoDB Conn Error...", err);
  });
