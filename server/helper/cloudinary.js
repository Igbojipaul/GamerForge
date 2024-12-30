const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

// Cloudinary configuration
cloudinary.config({
   cloud_name, 
   api_key, 
   api_secret
});

// Setting up multer to store files in memory
const storage = multer.memoryStorage();

// Utility function to upload image to Cloudinary
async function uploadImageUtil(file) {
   try {
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(file, {
         resource_type: "auto" 
      });
      return result;
   } catch (error) {
      console.error("Cloudinary Upload Error: ", error);
      throw error; 
   }
}

// Multer middleware setup
const upload = multer({ storage });

module.exports = {
   upload, 
   uploadImageUtil
};
