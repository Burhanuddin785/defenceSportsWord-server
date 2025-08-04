const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema({
  description: String,
  detail: String
});

const imageSchema = new mongoose.Schema({
  filename: String,
  url: String
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: Number, required: true },
  rate: { type: Number, required: true },
  description: { type: String },
  specifications: [specificationSchema],
  images: [imageSchema],
  stockQuantity: { type: Number, default: 0 },
  discountPrice: { type: Number },
  tags: [String],
  isFeatured: { type: Boolean, default: false },
  category: {
  _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true }
},
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
  // subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
