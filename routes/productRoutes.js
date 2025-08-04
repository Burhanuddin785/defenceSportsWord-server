const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { uploadProduct, getAllProducts, deleteProduct, getProducts, getFeatured } = require('../controllers/adminComponents/productController');

// Route to handle product upload
router.post(
  '/',
  upload.array('images', 10), // max 10 images allowed
  uploadProduct
);
router.get('/', getAllProducts )
router.get('/featured', getFeatured)
router.get('/:id', getProducts)
router.delete('/:id', deleteProduct )
module.exports = router;
