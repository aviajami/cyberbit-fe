import { Status } from "./enums/status";
import { User } from "./user";

export interface Task {
    id: number,
    title: string,
    description: string,
    createdByUserId: number,
    creationTime: Date,
    dueDate: Date,
    userId: number,
    status: Status;
    user: User;
}
