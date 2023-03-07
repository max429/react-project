import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IChapter} from "../../interfaces/chapters.interface";
const url = 'http://localhost:3000/';
export const chaptersApi = createApi({
    reducerPath: 'chaptersApi',
    baseQuery: fetchBaseQuery({baseUrl: url}),
    endpoints: (build) => ({
        getChapters: build.query<IChapter[], any>({
            query: () => {
                console.log('chaptersApi');
                return 'chapters'
            }
        }),
    })
})

export const {useGetChaptersQuery} = chaptersApi;
