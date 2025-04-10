import { Request, Response } from "express"
import { Error as MongooseError } from 'mongoose'
import UserService from "./UserService"
import { userDTO } from "../utils/dtos/userDTO";

export default class UserController {
    constructor(protected userService: UserService) { }
    create = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body as userDTO;
            const newUser = await this.userService.create(email, password);
            res.status(201).json(newUser);
            return;
        } catch (error) {
            if (error instanceof MongooseError.ValidationError) {
                const messages = Object.values(error.errors).map((error) => error.message);
                res.status(400).json({ message: messages });
                return

            };
            if (error instanceof Error && error.name === 'Conflict') {
                res.status(409).json({ message: error.message });
                return
            }
            res.status(500).json({ error: error });
            return
        }
    }

    findAll = async (req: Request, res: Response) => {

    }

    update = async (req: Request, res: Response) => {

    }

    delete = async (req: Request, res: Response) => {

    }

    findOne = async (req: Request, res: Response) => {

    }
}