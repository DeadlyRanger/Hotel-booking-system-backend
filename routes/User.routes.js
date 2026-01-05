import userController from "../controllers/User.controller.js";
import isAuth from "../middleware/isAuth.js";

import express from "express";

const userRouter = express.Router();


userRouter.post('/register',userController.register);
userRouter.post('/login',userController.login);
userRouter.post('/logout',userController.logout);
userRouter.get('/profile', isAuth,userController.Profile);

export default userRouter;