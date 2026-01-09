const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
  
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
