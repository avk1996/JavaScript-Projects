import cloudinary from "cloudinary";
import fs from "fs"; // file system for file handling inheriently given with nodejs

import { v2 } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file is uploaded successfully
    console.log(
      "file uploaded successfully on cloudinary " +
        response.format +
        " at " +
        response.url
    );
    return response;
  } catch (error) {
    // remove the locally saved temp file as failed to uplod the file
    fs.unlinkSync(localFilePath);
  }
};

export { uploadOnCloudinary };
