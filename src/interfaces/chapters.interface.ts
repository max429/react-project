export interface IChapter {
    id: number;
    name: string;
    tasks: IChapterTask[];
}

export interface IChapterTask {
    id: number;
    type: string;
    words: IChapterTaskWord[];
    passed: boolean;
}

export interface IChapterTaskWord {
    id: number,
    wordRu: string,
    wordEn: string,
    variants: IChapterTaskWordVariant[]
}

export interface IChapterTaskWordVariant {
    wordRu: string;
    wordEn: string;
    correct: boolean;
    id: number;
}


