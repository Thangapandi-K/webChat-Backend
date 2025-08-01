import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username required !"]
    },
    email: {
        type: String,
        required: [true, "Email Id required !"],
        unique: [true, "Email Id Already Exists !"]
    },
    password: {
        type: String,
    },
    displayPicture: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    isAccountPrivate: {
        type: Boolean,
        default: false
    },
    verifyOtp: {
        type: String,
        default: null
    },
    verifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    resetPasswordOtp: {
        type: String,
        default: null
    },
    resetPasswordOtpExpiry: {
        type: Number,
        default: 0
    }
}, 
{
    timestamps: true
});

const User = mongoose.model("User", userSchema, "users");

export default User;