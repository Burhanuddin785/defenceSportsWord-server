const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  templateImage: {
    type: String,
    required: true
  },
  heroImage: {
    type: String,
    required: true
  },
  tagLine:{
    type: String,
    required: true
  },
  subcategories: [
    {
      type: String 
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
