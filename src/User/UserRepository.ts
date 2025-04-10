
import { User } from "./UserModel"
export default class UserRepository {
    findAll = async () => {

    }
    create = async (email: string, password: string) => {
        
        const existingUser = await this.findOneByEmail(email);
        
        if (!existingUser) {
            const error = new Error('Email is already registered.');
            error.name = 'Conflict';
            throw error;
        }
  
        await User.validate({ email, password });
        const newUser = new User({ email, password });
        await newUser.save()
        return newUser;

    }

    update = async () => {

    }

    delete = async () => {

    }

    findOne = async () => {

    }
    
    findOneByEmail = async (email: string) => {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        return user;
    }
}