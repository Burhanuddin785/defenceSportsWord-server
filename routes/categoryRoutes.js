const express = require('express');
const router = express.Router();
const upload = require('../config/multer'); // Multer config
const { getAllCategories , uploadCategory, deleteCategory, getFeaturedCategories, getHero, getName} = require('../controllers/adminComponents/categoryController');

// Route to upload a new category
router.post('/',
  upload.fields([
    { name: 'templateImage', maxCount: 1 },
    { name: 'heroImage', maxCount: 1 }
  ]), uploadCategory
);

router.get('/', getAllCategories);
router.get('/hero/:id', getHero);
router.get('/featured', getFeaturedCategories);
router.get('/name/:id', getName);
router.delete('/:id', deleteCategory);


module.exports = router;
