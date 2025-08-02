import express from "express";
import userController from "../controllers/user.controller.js";
import isAuth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";


const userRouter = express.Router();

userRouter.patch("/profile", isAuth.loggedIn, userController.editProfile);
userRouter.patch("/displayPic", isAuth.loggedIn, upload.single("avatar"), userController.updateDisplayPic);

userRouter.delete("/removeDp", isAuth.loggedIn, userController.removeDisplayPic);

export default userRouter;