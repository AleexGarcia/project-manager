import { IUser, User } from "./UserModel"
export default class UserRepository {
    findAll = async () => {

    }
    create = async (user: IUser) => {
        return User.create(user);    
    }
    update = async () => {

    }
    delete = async () => {

    }
    findOne = async () => {

    }
}