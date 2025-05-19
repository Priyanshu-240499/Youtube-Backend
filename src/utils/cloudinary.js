import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

  // Configuration
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadFile = async (localFilePath)=>{
    try {
        if (!localFilePath) return null

        // Upload on cloudinary
       const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log("file uploaded on cloudinary successfully");
        return response;
        
    } catch (error) {
        fs.unlink(localFilePath) //method to delete the file from server when upload is failed
        return null;
    }

}

export {uploadFile}