import { Router } from "express";
import AuthController from "../Auth/AuthController";

export const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/auth/signin', authController.signIn);


