import { model, Schema } from "mongoose"
import { userRole } from "../utils/enum/userRole";

export interface IUser {
    email: string,
    password: string,
    role: userRole
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: [true, 'Email is required'], unique: [true, 'Email is already registered.'] },
    password: { type: String, required: [true, 'Password is required'] },
    role: { type: Number, enum: Object.values(userRole).filter(value => typeof value === 'number'), default: userRole.regular }
})

export const User = model<IUser>('User', userSchema);