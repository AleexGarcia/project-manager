
import { User } from "./UserModel";
import UserRepository from "./UserRepository";

export default class UserService {
    constructor(protected userRepository: UserRepository) { }
    create = async (email: string, password: string) => {
   
        return this.userRepository.create(email, password)

    }

    findAll = async () => {

    }

    update = async () => {

    }

    delete = async () => {

    }

    findOne = async () => {

    }
}