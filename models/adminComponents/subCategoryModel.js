const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagLine: { type: String, required: true },
  cardImage: { type: String, required: true },
  heroImage: { type: String, required: true },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
