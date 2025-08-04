const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { uploadSubCategory, getAllSubCategories, getSubcategoriesById } = require('../controllers/adminComponents/subCategoryController');

router.post(
  '/',
  upload.fields([
    { name: 'cardImage', maxCount: 1 },
    { name: 'heroImage', maxCount: 1 }
  ]),
  uploadSubCategory
);

router.get('/', getAllSubCategories);
router.get('/:id', getSubcategoriesById);

module.exports = router;
