const cloudinary = require('../../config/cloudinary');

exports.deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try { 
    await  cloudinary.uploader.destroy(publicId);
    console.log(`Successfully deleted image with public ID: ${publicId}`);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
}

exports.uploadToCloudinary = async (filePath) => {
  if (!filePath) return;
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'workshop-images',
      use_filename: true,
      unique_filename: false,
      overwrite: true
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}