import express from "express"
import { getProfile, logIn, logout, signUp } from "../controllers/auth.controllers.js";
import verifyUser from "../middlewares/verify.middlewares.js";

const authRouter = express.Router();

authRouter.post("/signup",signUp)
authRouter.post("/login",logIn)
authRouter.post("/logout",verifyUser,logout)
authRouter.get("/profile",verifyUser,getProfile)

export default authRouter;