import { Router } from "express";
import UserController from "../User/UserController";

export const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/users', userController.findAll);
userRoutes.post('/users', userController.create);
userRoutes.put('/users/:id', userController.update);
userRoutes.delete('/users/:id', userController.delete);
userRoutes.get('/users/:id', userController.findOne);
