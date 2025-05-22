const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../../config/cloudinary');

const storage = new  CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let folderName = 'skillitgh';
    const originalUrl = req.originalUrl || '';
    console.log("Full request URL:", req.originalUrl);

    if (originalUrl.includes('courses')) {
      folderName = 'skillitgh/courses';
    } else if (originalUrl.includes('workshops')) {
      folderName = 'skillitgh/workshops';
    } else if (originalUrl.includes(['users', 'profile'])) {
      folderName = 'skillitgh/profiles';
    } // else if (req.body.resource) {
    //   folderName = `skillitgh/${req.body.resource}`;
    // }
    return {
      folder: folderName,
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'pdf', 'docx', 'pptx'],
      transformation: [{ width: 500, height: 500, crop: 'limit' }],
    }
  },
});

const upload = multer({ storage });

// Middleware to handle file upload
const uploadFile = (req, res, next) => {
  upload.single('workshopImage')(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err.message);
      return res.status(400).json({ error: 'File upload failed' });
    }
    next();
  });
};

module.exports = {upload, uploadFile};