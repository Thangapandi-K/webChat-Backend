import "dotenv/config";

const envKeys = {
    // PORT
    PORT: process.env.PORT,
    //DATABASE
    MONGODB_URI: process.env.MONGODB_URI,
    // JSON WEB TOKEN
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY,
    // CLOUDINARY
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET 
};

export default envKeys;