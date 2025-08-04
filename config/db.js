const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/defenceSportsWorld", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Stop server on failure
  }
};

module.exports = connectDB;
