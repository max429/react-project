import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IUser} from "../../interfaces/test.interface";
const url = "http://localhost:3000/"

export const testApi = createApi({
    reducerPath: 'testApi',
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({baseUrl: url}),
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], any>({
            query: () => 'users',
            providesTags: result => result ? [
                    ...result.map(({ id }) => ({ type: 'Users' as const, id })),
                    { type: 'Users', id: 'LIST' },
                ]
                : [{ type: 'Users', id: 'LIST' }],
        }),
        addUser: builder.mutation({
            query: (body: IUser) => ({
                url: 'users',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Users', id: 'LIST'}],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Users', id: 'LIST'}],
        })
    })
})

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } = testApi;
