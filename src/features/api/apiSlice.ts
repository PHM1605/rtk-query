import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ITodo {
  userId: number 
  id: string
  title: string 
  completed: boolean
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500'}),
  // to show where the cache is; if it changes (invalidatesTags:[...]) reload everything
  tagTypes: ['Todos'],
  // define methods to interact with the api
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], void>({
      query: () => '/todos',
      transformResponse: (res: ITodo[]) => res.sort((a, b) => Number(b.id)-Number(a.id)),
      providesTags: ['Todos'] 
    }),
    // 'mutation' means we also change the data
    addTodo: builder.mutation({
      query: (todo:ITodo) => ({
        url: '/todos',
        method: 'POST',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation({
      query: ({id}: {id:string}) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id
      }),
      invalidatesTags: ['Todos']
    })
  })
})

export const {
  useGetTodosQuery, // this name is directly linked with method name defined in 'createApi->endpoints'
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = apiSlice;