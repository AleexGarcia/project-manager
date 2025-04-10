import { Router } from "express";
import ProjectController from "../Projects/ProjectController";

export const projectRoutes = Router();
const projectController = new ProjectController();

projectRoutes.get('/projects', projectController.findAll);
projectRoutes.post('/projects', projectController.create);
projectRoutes.put('/projects/:id', projectController.update);
projectRoutes.delete('/projects/:id', projectController.delete);
projectRoutes.get('/projects/:id', projectController.findOne);
