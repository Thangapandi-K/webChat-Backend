import { v2 as cloudinary } from "cloudinary";
import envKeys from "./env.config.js";

cloudinary.config({
    cloud_name: envKeys.CLOUDINARY_CLOUD_NAME,
    api_key: envKeys.CLOUDINARY_API_KEY,
    api_secret: envKeys.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = (folder, fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
            if (error) {
                return reject(error)
            } else {
                resolve(result);
            };
        });
        stream.end(fileBuffer);
    });
};

export const deleteInCloudinary = (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if(error) {
                return reject(error);
            };
            resolve(result);
        } );
    });
};