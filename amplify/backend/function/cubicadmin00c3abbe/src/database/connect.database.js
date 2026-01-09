const mongoose = require("mongoose");
const url = "mongodb+srv://devop:JExNwFyzBJ67xWxJgpvd@cubic.udixe22.mongodb.net/?appName=cubic"
  
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
