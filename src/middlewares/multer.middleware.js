const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../config/cloudinary');

const storage = new  CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'skillitgh',allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Middleware to handle file upload
const uploadFile = (req, res, next) => {
  upload.single('courseImage')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: 'File upload failed' });
    }
    next();
  });
};

module.exports = {
  upload,
  uploadFile,
}