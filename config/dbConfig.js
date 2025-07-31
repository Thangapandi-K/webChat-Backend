import mongoose from "mongoose";
import envKeys from "./envConfig.js";

const connectDB = async() => {
    try {
        await mongoose.connect(envKeys.MONGODB_URI);
        return console.log("Database Connected Successfully !");
    } catch (error) {
        return console.log({ "Server Connection Error": error.message });
    }
};

export default connectDB;