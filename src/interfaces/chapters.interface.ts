export interface IChapter {
    id: number;
    name: string;
    tasks: IChapterTask[];
}

interface IChapterTask {
    id: number;
    type: string;
    words: IChapterTaskWord[];
    passed: boolean;
}

interface IChapterTaskWord {

}


