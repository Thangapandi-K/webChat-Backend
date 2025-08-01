import jwt from "jsonwebtoken";
import envKeys from "../config/env.config.js";

const jwtToken = {
    // get access token
    getAccessToken: async(id) => {
        return jwt.sign({ id }, envKeys.ACCESS_SECRET_KEY, { expiresIn: "1m" });
    },
    // get refresh token
    getRefreshToken: async(id) => {
        return jwt.sign({ id }, envKeys.REFRESH_SECRET_KEY, { expiresIn: "7d" });
    },
    // verify access token
    verifyAccessToken: async(token) => {
        return jwt.verify(token, envKeys.ACCESS_SECRET_KEY);
    },
    // verify refresh token
    verifyRefreshToken: async(token) => {
        return jwt.verify(token, envKeys.REFRESH_SECRET_KEY);
    }
};

export default jwtToken;