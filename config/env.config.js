import "dotenv/config";

const envKeys = {
    // PORT
    PORT: process.env.PORT,
    //DATABASE
    MONGODB_URI: process.env.MONGODB_URI,
    // JSON WEB TOKEN
    REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY,
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY
};

export default envKeys;