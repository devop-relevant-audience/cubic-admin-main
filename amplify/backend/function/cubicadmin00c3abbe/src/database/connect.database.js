const mongoose = require("mongoose");
const url =
  "mongodb+srv://celestialcoderisingstar:VNzBZV4by6Cdqvpk@cluster0.98m2o.mongodb.net/";
let connection;
const connectDB = async () => {
  try {
    connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");

    return connection;
  } catch (e) {
    console.error("Could not connect to MongoDB...");
    throw e;
  }
};
module.exports = { connectDB };
