import "dotenv/config";

const envKeys = {
    // PORT
    PORT: process.env.PORT,
    //DATABASE
    MONGODB_URI: process.env.MONGODB_URI
};

export default envKeys;