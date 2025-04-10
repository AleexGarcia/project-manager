import { Router } from "express";
import UserController from "../User/UserController";
import UserService from "../User/UserService";
import UserRepository from "../User/UserRepository";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export const userRoutes = Router();

userRoutes.get('/users', userController.findAll);
userRoutes.post('/users', userController.create);
userRoutes.put('/users/:id', userController.update);
userRoutes.delete('/users/:id', userController.delete);
userRoutes.get('/users/:id', userController.findOne);
