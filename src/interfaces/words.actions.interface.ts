export interface FetchWordsForTaskParameters {
    wordEn: string;
}

export interface WordsAmuseResponse {
    word: string;
    defs: string[];
    score: number;
}
