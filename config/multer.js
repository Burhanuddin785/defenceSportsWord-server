const fs = require('fs');
const multer = require('multer');
const path = require('path');

// storage destination and filename logic

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    const folder = req.body.uploadType?.trim().replace(/\s+/g, '_') || 'default';
    fs.mkdirSync(`uploads/adminComponents/${folder}`, { recursive: true });
    cb(null, `uploads/adminComponents/${folder}`); // Save here
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const isAllowed = allowedTypes.test(file.mimetype);
  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;