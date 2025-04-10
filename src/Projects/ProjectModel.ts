import { model, ObjectId, Schema, Types } from "mongoose"
import { projectStatus } from "../utils/enum/projectStatus"

interface IProject {
    title: string
    description: string
    status: projectStatus
    userId: Types.ObjectId;
}

const projectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Number, enum: Object.values(projectStatus), default: projectStatus.planned },
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
})

export const Project = model<IProject>('Project', projectSchema);