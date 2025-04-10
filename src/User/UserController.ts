import { Request, Response } from "express"
import UserService from "./UserService"

export default class UserController {
    constructor(protected userService: UserService) { }
    findAll = async (req: Request, res: Response) => {

    }
    create = async (req: Request, res: Response) => {

    }
    update = async (req: Request, res: Response) => {

    }
    delete = async (req: Request, res: Response) => {

    }
    findOne = async (req: Request, res: Response) => {

    }
}