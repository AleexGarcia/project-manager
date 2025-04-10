import { userRole } from "../enum/userRole"

export interface userDTO {
    email: string
    password: string
    _id?: string
    createdAt?: Date
    updatedAt?: Date
    role?: userRole
}