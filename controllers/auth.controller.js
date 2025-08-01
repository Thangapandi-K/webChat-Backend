import User from "../models/user.model.js";
import bcryption from "../utils/bcryptjs.utils.js";
import jwtToken from "../utils/jsonwebtoken.utils.js";

const authController = {
    // register new user
    register: async(request, response) => {
        try {
            // get user data
            const { name, email, password } = request.body;
            if(!name || !email || !password) {
                return response.status(400).json({ success: false, message: "Provide all details !" });
            };
            // check if user registered
            const isUserRegistered = await User.findOne({ email });
            if(isUserRegistered) {
                return response.status(400).json({ success: false, message: "User already registered !" });
            };
            // hash the password
            const hashedPassword = await bcryption.hashPassword(password, 10);
            // create and save new user
            await User.create({
                name,
                email,
                password: hashedPassword
            });
            // success response
            return response.status(200).json({ success: true, message: "User registered successfully !"});
        } catch (error) {
            return response.status(200).json({ success: false, message: error.message });
        }
    },
    // login user
    login: async(request, response) => {
        try {
            // getting user data
            const { email, password } = request.body;
            if(!email || !password) {
                return response.status(400).json({ success: false, message: "Provide all details !" });
            };
            // check if user registered
            const existingUser = await User.findOne({ email }, { name: 1, email: 1, password: 1, bio: 1, isAccountVerified: 1, isAccountPrivate: 1 });
            if(!existingUser) {
                return response.status(404).json({ success: false, message: "User not registered !" });
            };
            // check password
            const isPasswordMatch = await bcryption.verifyPassword(password, existingUser.password);
            if(!isPasswordMatch) {
                return response.status(401).json({ success: false, message: "Invalid Credentials !"});
            };
            // create refresh token
            const refreshToken = await jwtToken.getRefreshToken(existingUser._id);
            // create access token
            const accessToken = await jwtToken.getAccessToken(existingUser._id);
            // set cookie
            response.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });
            // success response
            return response.status(200).json({ 
                success: true, 
                message: "User logged-in successfully !", 
                user: {
                    name: existingUser.name,
                    email: existingUser.email,
                    bio: existingUser.bio,
                    isAccountVerified: existingUser.isAccountVerified,
                    isAccountPrivate: existingUser.isAccountPrivate
                },
                accessToken,
            });
        } catch (error) {
            return response.status(500).json({ success: false, message: error.message });
        }
    },
    // get user profile
    profile: async(request, response) => {
        try {
            // getting user data
            const { userId } = request;
            if(!userId) {
                return response.status(400).json({ success: false, message: "Provide all details !" });
            };
            // check user exists
            const user = await User.findById(userId, { name: 1, email: 1, bio: 1, isAccountVerified: 1, isAccountPrivate: 1 })
            if(!user) {
                return response.status(404).json({ success: false, message: "User not registered !" });
            };
            // success response
            return response.status(200).json({ 
                success: true, 
                message: "User Profile Fetched Successfully !", 
                user: {
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                    isAccountVerified: user.isAccountVerified,
                    isAccountPrivate: user.isAccountPrivate
                },
            });
        } catch (error) {
            return response.status(500).json({ success: false, message: error.message });
        }
    },
    // get new accessToken
    getAccessToken: async(request, response) => {
        try {
            // get token from cookies
            const { refreshToken } = request.cookies;
            if (!refreshToken) {
                return response.status(401).json({ success: false, message: "Access Denied  ! Please Login Again ! "});
            };
            // check is token valid
            const isTokenValid = await jwtToken.verifyRefreshToken(refreshToken);
            if (!isTokenValid) {
                return response.status(401).json({ success: false, message: "Access Denied !"});
            };
            // create new access token
            const accessToken = await jwtToken.getAccessToken(isTokenValid.id);
            // success response
            return response.status(200).json({ success: true, message: "New Access Token Delivered da!", accessToken},);
        } catch (error) {
            return response.status(500).json({ success: false, message: error.message });
        }
    },
    // logout user
    logout: async(request, response) => {
        try {
            // modify existing cookie
            // should clear cookie with "response.clearCookie()"(recommended) as it is my personal project and cant clear cookie in netlify so i am using modification technique(not recommended)
            response.cookie("refreshToken", "", { maxAge: 0 });
            // success response
            return response.status(200).json({ success: true, message: "User logged-out successfully !" });
        } catch (error) {
            return response.status(500).json({ success: false, message: error.message });
        }
    },
};

export default authController;