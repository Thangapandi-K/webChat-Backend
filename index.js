import express from "express";
import { PORT } from "./config/envKeys.js";

const app = express();

app.get("/", (request, response) => {
    try {
        return response.status(200).send("<h1>Welcome to 'webChat'</h1>");
    } catch (error) {
        return response.status(500).json({ success: false, message: "Something Went Wrong !"});
    }
})

app.listen(PORT, (error) => {
    
    if(error) return console.log({ error: error.message });
    
    console.log(`Server Connected Successfully on http://localhost:${PORT}`);
});