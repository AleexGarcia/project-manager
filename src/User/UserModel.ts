import { model, Schema } from "mongoose"
import { userRole } from "../utils/enum/userRole";

export interface IUser {
    email: string,
    password: string,
    role?: userRole
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, enum: Object.values(userRole), default: userRole.regular }
})

export const User = model<IUser>('User', userSchema);