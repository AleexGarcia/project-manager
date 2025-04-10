import UserRepository from "./UserRepository";

export default class UserService {
    constructor(protected userRepository: UserRepository){}
}