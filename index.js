import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import envKeys from "./config/env.config.js";
import connectDB from "./config/db.config.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.get("/", (request, response) => {
    try {
        return response.status(200).send("<h1>Welcome to 'webChat'</h1>");
    } catch (error) {
        return response.status(500).json({ success: false, message: "Something Went Wrong !"});
    }
});

app.use("/api/v1/auth", authRouter);

app.listen(envKeys.PORT, async(error) => {
    
    if(error) return console.log({ error: error.message });
    await connectDB();
    console.log(`Server Connected Successfully on http://localhost:${envKeys.PORT}`);
});