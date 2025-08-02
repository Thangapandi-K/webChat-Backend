import express from "express";
import authController from "../controllers/auth.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

authRouter.get("/profile", isAuth.loggedIn, authController.profile);
authRouter.get("/refresh", authController.getAccessToken);

export default authRouter;