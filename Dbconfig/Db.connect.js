const mongoose = require("mongoose")

const uri = process.env.MONGO_URI

const Connect = async () => {
    try {
      const connection = await mongoose.connect(uri);
      if (connection) {
        console.log("Database connected successfully");
      }
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  };

module.exports = Connect

