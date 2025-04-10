import { projectStatus } from "../enum/projectStatus";

export interface ProjectDTO {
    title: string
    description: string
    userId: string
    _id?: string
    status?: projectStatus
    createdAt?: Date
    updateAt?: Date
}
