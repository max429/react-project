export interface IUser {
    id: number;
    name: string;
    passedTasks: {
        taskId: number;
        chapterId: number;
    }[];
    currentTask: {
        taskId: number;
        chapterId: number;
    }
}
