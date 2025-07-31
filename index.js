import express from "express";
import envKeys from "./config/envConfig.js";
import connectDB from "./config/dbConfig.js";

const app = express();

app.get("/", (request, response) => {
    try {
        return response.status(200).send("<h1>Welcome to 'webChat'</h1>");
    } catch (error) {
        return response.status(500).json({ success: false, message: "Something Went Wrong !"});
    }
})

app.listen(envKeys.PORT, async(error) => {
    
    if(error) return console.log({ error: error.message });
    await connectDB();
    console.log(`Server Connected Successfully on http://localhost:${envKeys.PORT}`);
});